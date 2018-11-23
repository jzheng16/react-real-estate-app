const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');
const { API_KEY } = require('../config');
const db = require('./db/index.js');
const passport = require("passport");
const User = require('./db/models/user');
const port = process.env.PORT || 5000;

// Connect to our database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('hey we\'re connected!');
});


//Passport middleware 

passport.serializeUser(function (user, cb) {
  console.log('user?', user)
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    console.log('user', user)
    cb(err, user);
  });
});


//passport.use(localStrategy);
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

      console.log('compare', user.comparePassword(req.body.password));
      if (!user) {
        console.log('No such user found:', req.body.email);
        console.log('where am i')
        res.status(401).send('Wrong username and/or password');

      } else if (!user.comparePassword(req.body.password)) {
        console.log('compare', user.comparePassword(req.body.password));
        console.log('where am i2');

        console.log('Incorrect password for user:', req.body.email);
        res.json('Wrong username and/or password');
      } else {
        console.log('what is this?', req.user);
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

// Signup
// Email and a password 
app.post('/signup', (req, res) => {
  // req.body.email req.body.password
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        User.create({ email: req.body.email, password: req.body.password })
          .then(newUser => {
            console.log('Successfully created new user!', newUser);
            res.json(newUser);
          })
      }
      else {
        res.json('Sorry email is in use, please try again');
      }
    });
  // here we check to see if the database has a record of the user's email
  // promise - handling asychronous operations. It promises completion of the operation, success or reject/failure.
});


app.get('/deepSearchResults/:address/:citystatezip', (req, res) => {

  axios.get(
    `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${API_KEY}&address=${req.params.address}&citystatezip=${req.params.citystatezip}`
  )
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
})

app.get('/deepComparables/:zpid', (req, res) => {

  axios.get(
    `http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=${API_KEY}&zpid=${req.params.zpid}&count=5`
  )
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
})


app.listen(port, () => console.log(`Listening on port ${port}`));
