const passport = require('passport');
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




passport.use('signup', new LocalStrategy({
  passReqToCallback : true
  },
  function(req, username, password, done) {console.log(1);
    const newUser = new User();
    newUser.email = req.username;
    newUser.password = password;
    console.log(newUser);
    //User.create({ email: req.email }.then(res => console.log(res)));
      /*, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      console.log('create');
      return done(null, user);
    });*/
    return done(null, newUser);
  }
));


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