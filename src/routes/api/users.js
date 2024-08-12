const express = require('express');
const router = express.Router();
const passport = require('../../middleware/auth');
const User = require('../../models/User');
//const LocalStrategy = require('passport-local').Strategy;

router.get('/signin', (req, res) => {
  res.render('users/login', {
    title: 'Аутентификация'
  })
})

router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/api/signin' }),
  (req, res) => {
    res.redirect('/api/account');
  }
)

router.get('/signup', (req, res) => {
  res.render('users/register', {
    title: 'Регистрация'
  })
})

router.post('/signup', 
  passport.authenticate('signup', { successRedirect: '/api/signup', failureRedirect: '/api/signin' }),
  (req, res) => {
  const { email, password, name, contactPhone } = req.body; console.log(req.body)}
  /*User.create({email, passwordHash: password, name, contactPhone})
    .then(reply => console.log(reply))
    .catch(e => console.log(`Ошибка обмена данными 1: ${e}`));*/
    //.then(res.redirect('/signin'))
  // res.render('users/register', {
  //   title: 'Регистрация'
  // })
)


router.get('/account', (req, res) => {
  res.render('users/account', {
    title: 'Аккаунт пользователя'
  })
})

router.get('/logout',  (req, res) => {
  req.logout(null, () => {
    
  });
  res.redirect('/signin');
})

module.exports = router;