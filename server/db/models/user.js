// We have to create the user Schema
/* eslint-disable */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  email: { type: String },
  savedProperties: [{
    address: String,
    zestimate: Number,
    beds: Number,
    baths: Number,
  }],

  password: {
    type: String,
    required: true,
  },
});


UserSchema.methods.serialize = function () {
  return {
    email: this.email || '',
  };
};


UserSchema.pre('save', function (next) {
  const user = this;
  const saltRounds = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();


  // Proper syntax needed for encrypting a password, we salt it (append some random letters) and then hash it.
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    user.password = hash;
    next();
  });
});


// UserSchema.methods.comparePassword = function (candidatePassword) {
//   bcrypt.compare(candidatePassword, this.password)
//     .then(isMatch => (!!isMatch));
// };


UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model('User', UserSchema);

// exporting js from one file to another
module.exports = User;
