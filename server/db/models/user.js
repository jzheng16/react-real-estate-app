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

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

// exporting js from one file to another
module.exports = User;