const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const nodemailer = require('nodemailer');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();
const axios = require('axios');
const { API_KEY } = require('../config');
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

// Cors allows us to get resources from other servers
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email);
        res.json('Wrong email and/or password');
      } else if (!user.comparePassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email);
        res.json('Wrong email and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

// Signup
// Email and a password
app.post('/signup', (req, res, next) => {
  // req.body.email req.body.password
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        User.create({ email: req.body.email, password: req.body.password })
          .then(newUser => {
            req.login(newUser, err => (err ? next(err) : res.json(newUser)));
          });
      } else {
        res.json('Sorry email is in use, please try again');
      }
    });
  // here we check to see if the database has a record of the user's email
  // promise - handling asychronous operations. It promises completion of the operation, success or reject/failure.
});


app.get('/deepSearchResults/:address/:citystatezip', (req, res) => {
  axios.get(
    `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${API_KEY}&address=${req.params.address}&citystatezip=${req.params.citystatezip}`,
  )
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});

app.get('/deepComparables/:zpid', (req, res) => {
  axios.get(
    `http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=${API_KEY}&zpid=${req.params.zpid}&count=5`,
  )
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});


app.post('/saveProperty', (req, res) => {
  console.log('what are we getting back from our req?', req.body);
  User.updateOne(
    { 'email': req.user.email, 'savedProperties.address': { $ne: req.body.address } },
    {
      '$addToSet': {
        'savedProperties': {
          'zestimate': req.body.zestimate,
          'address': req.body.address,
        },
      },
    },
  )
    .then(response => {
      console.log('What is response: ', response);
      // Response.n denotes if our saved properties was modified or not
      if (response.n) {
        res.json('Property successfully saved');
      } else {
        res.json('Property already saved!');
      }
    })
    .catch(err => console.log(err));
});


app.post('/sendemail', (req, res) => {
  console.log(req.body.sender, req.body.email, req.body.zipcode, req.body.phonenumber);
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'test.no.reply.mfpclone@gmail.com',
      pass: 'wrY4fezBYGQuiX38FVhgkG6Wr',
    },
    logger: false,
    debug: false,
  });

  const message = {
    from: `${req.body.sender}  <test.no.reply.mfpclone@gmail.com>`,
    to: 'keng4105@gmail.com',
    subject: 'Find me this damn property',
    html: `<div> ${req.body.email}, ${req.body.zipcode}, ${req.body.phonenumber} </div>`,
  };

  transport.sendMail(message, (error, info) => {
    if (error) console.log('Error sending email: ', error);
    res.json(info);
  });
});

app.get('/me', (req, res) => {
  console.log('user', req.user);
  res.json(req.user);
});

app.get('/logout', (req, res) => {
  req.logout(); // Clear req.user object
  req.session.destroy();
  res.json('Successfully logged out');
});


app.listen(port, () => console.log(`Listening on port ${port}`));
