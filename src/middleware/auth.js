const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
var MD5 = require("crypto-js/md5");

const verify = (username, password, done) => {
  User.findOne({ email : username, passwordHash: MD5(password).toString()})
  .then(user => {
    if (!user) {
      throw new Error('Неверный логин или пароль');
    } else {
      const newObj = {
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
          contactPhone: user.contactPhone
        },
        status: 'ok'
      };
      return newObj;
    }
  })
  .then(reply => done(null, reply))
  .catch(e => done({error: 'Неверный логин или пароль', status: 'error'}));
}

const options = {
  usernameField: "email",
  passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user.data.id)
})

passport.deserializeUser( (id, cb) => {
  User.findById(id).then(user => cb(null, user)).catch(e => cb(e))
})




passport.use('signup', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback : true
  },
  function(req, username, password, done) {
    const newUser = new User();
    newUser.email = username;
    newUser.passwordHash = MD5(password).toString();
    newUser.name = req.body.name;
    newUser.contactPhone = req.body.contactPhone;
    
    User.create(newUser)
      .then(user => {
        const newObj = {
          data: {
            id: user._id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone
          },
          status: 'ok'
        };
        return newObj;
      })
      .then(reply => done(null, reply))
      .catch(e => {
        if (e.errorResponse.code === 11000) {
          done({error: 'email занят', status: 'error'});
        } else {
          done({error: `Ошибка ${e.errorResponse.code}`, status: 'error'});
        }
      });
  }
));

cpb();
async function cpb() {
  const cpb = await User.findOne({email: 'cpb@bizb.ru'});
  // console.log('***');
  // console.log(cpb);
  // console.log('***');

  if (!cpb) {
    const newUserTemp = new User();
    newUserTemp.email = "cpb@bizb.ru";
    newUserTemp.passwordHash = MD5('123').toString();
    newUserTemp.name = "cpb";
    newUserTemp.contactPhone = "123";
    User.create(newUserTemp);
  }
}


module.exports = passport;
/*const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const verify = (username, password, done) => {
  User.findOne({ email : username, passwordHash: password}).then(user => done(null, user)).catch(e => done(e));
}

const options = {
  usernameField: "email",
  passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser( (id, cb) => {
  User.findById(id).then(user => cb(null, user)).catch(e => cb(e))
})

module.exports = passport;*/