const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');
const { API_KEY } = require('../config');
const db = require('./db/index.js');
const passport = require("passport");
const localStrategy = require('./passportStrategy');
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

      if (!user) {
        console.log('No such user found:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else if (!user.validatePassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else {
        console.log('what is this?', req.user);
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

app.post('/user', (req, res) => {
  console.log('req', req.user);
  let user;
  User.create({ email: 'x@x.com', password: '1234' })
    .then(user => {
      console.log('user');
      res.json(user);
    });
});

app.get('/search', function (req, res) {
  console.log('hey');

  axios.get(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${API_KEY}&address=16522+78+Ave&citystatezip=Flushing%2C+Ny+11366`)
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
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
