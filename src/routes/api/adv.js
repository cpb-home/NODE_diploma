const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertisement');
const passport = require('../../middleware/auth');
const fileMulter = require('../../middleware/file').any('images');
const User = require('../../models/User');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    const allAdvs = await Advertisement.find({ isDeleted: { $nin: true } });
    const sessMsg = req.session.sessMsg || '';
    const users = await User.find({}, {name: 1});
    req.session.sessMsg = '';
    
    res.render('adv/list', {
      title: 'Объявления',
      allAdvs: allAdvs,
      user: req.user,
      sessMsg: sessMsg, 
      users: users
    })
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
});

router.post('/', (req, res) => {
  fileMulter(req, res, async (err) => {
    if (err) {
      console.log(err);
      return;
    }
    const fileNames = [];
    const addAdv = new Advertisement();
    const { shortText, description, tags } = req.body;
    for (let i = 0; i < req.files.length; i++) {
      fileNames.push('/uploads/' + req.files[i].filename);
    }
    const tagsArr = tags !== '' ? tags.split(' ') : [];
    const newTags = [];
    for (let i = 0; i < tagsArr.length; i++) {
      newTags.push(tagsArr[i]);
    }
    
    addAdv.shortText = shortText;
    addAdv.description = description;
    addAdv.tags = newTags;
    addAdv.images = fileNames;
    addAdv.createdAt = new Date();
    addAdv.updatedAt = new Date();
    addAdv.isDeleted = false;
    addAdv.userId = req.user._id;


    const added = await Advertisement.create(addAdv);
    req.session.sessMsg = {status: 'ok', message: 'Объявление успешно добавлено'};
    res.redirect('/api/advertisements');
  });
});

router.get('/add', (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.sessMsg = {status: 'error', message: 'Вы не авторизованы'};
    return res.redirect('/api/advertisements');
  }
  next();
  },
  (req, res) => {
    res.render('adv/add', {
      title: 'Добавление объявления',
      user: req.user
    })
  }
)

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const adv = await Advertisement.findOne({ _id: id });
    const users = await User.find({}, {name: 1});
    
    res.render('adv/moreinfo', {
      title: adv.shortText,
      adv: adv,
      user: req.user,
      users: users
    })
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
});

router.delete('/:id', (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.sessMsg = {status: 'error', message: 'Вы не авторизованы'};
    return res.redirect('/api/advertisements');
  }
  next();
  },
  (req, res) => {
    const { id } = req.params;

    if (req.user) {
      const deleteRes = deleteAdv(id, req.user._id);
  
      if (deleteRes === 200) {
        res.status = 200;
        res.json({result: 'Ok'});
      } else if (deleteRes === 403) {
        res.status = 403;
        res.json({error: 'Вы не являетесь автором объявления'});
      } else {
        res.status = 404;
        res.json({error: 'Не удалось удалить'});
      }
    } else {
      res.status = 401;
      res.json({error: 'Вы не авторизованы'});
    }
  }
);

async function deleteFiles(id) {
  const adv = await Advertisement.findById(id);
  if (adv.images.length > 0) {
    try {
      adv.images.forEach(img => {
        fs.unlink('/app/src/public/' + img, (err) => {
          if (err) return false;
        });
      })
      return true;
    } catch (e) {
      return false;
    }
  }
}
/*
function getFilesInDirectory() {
  console.log("\nFiles present in directory:");
  let files =       fs.readdirSync('/app/src/public/uploads/');
  files.forEach(file => {
      console.log(file);
  });
}
*/
async function deleteAdv(id, userId) {
  const adv = await Advertisement.findById(id);
  if (String(adv.userId) !== String(userId)) {
    return 403;
  }

  if (deleteFiles(id)) {
    const done = await Advertisement.deleteOne({ _id: id });
    return 200;
  }
  return 404;
}

module.exports = router;