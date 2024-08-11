const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const verify = (username, password, done) => {
  User.findOne({ email : username, passwordHash: password}).then(user => done(null, user)).catch(e => done(e));
}

const options = {
  usernameField: "email",
  passwordField: "passwordHash",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser( (id, cb) => {
  User.findById(id).then(user => cb(null, user)).catch(e => cb(e))
})

module.exports = passport;