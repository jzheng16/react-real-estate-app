// We have to create the user Schema 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
  address: String
})

const UserSchema = mongoose.Schema({
  email: { type: String },
  userSavedProperties: [propertySchema],

  password: {
    type: String,
    required: true
  },
});


UserSchema.methods.serialize = function () {
  return {
    email: this.email || ''
  };
};


UserSchema.pre('save', function (next) {
  const user = this;
  const saltRounds = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();


  // Proper syntax needed for encrypting a password, we salt it (append some random letters) and then hash it. 
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    user.password = hash;
    next();
  });
});


UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => {
      console.log('matching?', isMatch);
      return isMatch;
    });


};

const User = mongoose.model('User', UserSchema);

// exporting js from one file to another
module.exports = User;