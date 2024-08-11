const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('adv/list', {
    title: 'Объявления',
  })
});

router.get('/:id', (req, res) => {
  res.render('adv/add', {
    title: 'Просмотр объявления',
  })
});

router.post('/', (req, res) => {
  res.render('adv/add', {
    title: 'Добавление объявления',
  })
});

module.exports = router;