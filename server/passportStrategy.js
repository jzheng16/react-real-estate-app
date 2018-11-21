const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/models/user');

const localStrategy = new LocalStrategy((email, password, done) => {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    if (!user.validatePassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
});

module.exports = localStrategy;
