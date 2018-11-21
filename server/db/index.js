const { MLAB_USER, MLAB_PASSWORD } = require('../../config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MLAB_USER}:${MLAB_PASSWORD}@ds147391.mlab.com:47391/real-estate-app`, { useNewUrlParser: true }, function (err) {
  if (err) return console.log(err);
  console.log("Connected to mLab DB");
});
const db = mongoose.connection;


module.exports = db;