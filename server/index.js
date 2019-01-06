const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

const db = require('./db/index.js');

const User = require('./db/models/user');


const port = process.env.PORT || 5000;

// Connect to our database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('hey we\'re connected!');
});


// Create a session for each request Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'test secret only for development',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


// Passport middleware

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});


// passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());


// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use('/api', require('./api'));

// Cors allows us to get resources from other servers
app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));
