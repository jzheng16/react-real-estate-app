const mongoose = require('mongoose');
const { MLAB_USER, MLAB_PASSWORD } = require('../../config');


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MLAB_USER}:${MLAB_PASSWORD}@ds147391.mlab.com:47391/real-estate-app`, { useNewUrlParser: true }, err => {
  if (err) return console.log(err);
  return console.log('Connected to mLab DB');
});
const db = mongoose.connection;


module.exports = db;
