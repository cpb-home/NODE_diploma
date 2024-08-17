const express = require('express');
const router = express.Router();
const passport = require('../../middleware/auth');

router.get('/signin', (req, res) => {
  res.render('users/login', {
    title: 'Аутентификация',
    error: ''
  })
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.render('users/login', {
        title: 'Аутентификация',
        error: err.error
      })
      return next(err);
    }
    
    if (! user) {
      console.log({ success : false, message : 'authentication failed' })
      return res.send({ success : false, message : 'authentication failed' });
    }
    
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      res.redirect('/api/account');
    });
  })(req, res, next);
});

router.get('/signup', (req, res) => {
  res.render('users/register', {
    title: 'Регистрация',
    error: ''
  })
})

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      res.render('users/register', {
        title: 'Регистрация',
        error: err.error
      })
      return next(err);
    }
    
    if (! user) {
      console.log({ success : false, message : 'authentication failed' })
      return res.send({ success : false, message : 'authentication failed' });
    }
    
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      res.redirect('/api/account');
    });
  })(req, res, next);
});

router.get('/account', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/api/signin')
  }
  next()
  },
  (req, res) => {
    res.render('users/account', {
      title: 'Личный кабинет',
      user: req.user
    })
  }
)

router.get('/logout',  (req, res) => {
  req.logout(null, () => {
    
  });
  res.redirect('/api/signin');
})

module.exports = router;