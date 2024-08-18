const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertisement');
const passport = require('../../middleware/auth');
const fileMulter = require('../../middleware/file').any('images');
const User = require('../../models/User');

router.get('/', async (req, res) => {
  try {
    const allAdvs = await Advertisement.find().select('-__v');
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
    const tagsArr = tags.split(' ');
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
    return res.redirect('/api/advertisements')
  }
  next()
  },
  (req, res) => {
    res.render('adv/add', {
      title: 'Добавление объявления',
      user: req.user
    })
  }
)

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Came to GET')
  /*res.render('adv/item', {
    title: 'Просмотр объявления',
    user: req.user,
    adv: Advertisement.find({_id: id})
  })*/
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Came to DELETE')
  /*if ((Advertisement.deleteOne({_id: id})).deletedCount === 1) {
    req.session.sessMsg = {status: 'ok', message: 'Объявление успешно удалено'};
    res.redirect('/api/advertisements');
  } else {
    req.session.sessMsg = {status: 'error', message: 'Не удалось удалить объявление'};
    res.redirect('/api/advertisements');
  }*/
});



module.exports = router;