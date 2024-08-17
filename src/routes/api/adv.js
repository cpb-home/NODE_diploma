const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertisement');

router.get('/', async (req, res) => {
  try {
    const allAdvs = await Advertisement.find().select('-__v');
    
    res.render('adv/list', {
      title: 'Объявления',
      allAdvs: allAdvs,
      user: req.user
    })
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
});

router.get('/:id', (req, res) => {
  res.render('adv/add', {
    title: 'Просмотр объявления',
    user: req.user
  })
});

router.post('/', (req, res) => {
  res.render('adv/add', {
    title: 'Добавление объявления',
    user: req.user
  })
});

module.exports = router;