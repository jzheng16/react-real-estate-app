const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../db/models/user');

router.post('/login', (req, res, next) => {
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
router.post('/signup', (req, res, next) => {
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


router.post('/saveProperty', (req, res) => {
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
    .catch(err => console.log('ERROR ERROR', err));
});


router.post('/sendemail', (req, res) => {
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

router.get('/me', (req, res) => {
  console.log('user', req.user);
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout(); // Clear req.user object
  req.session.destroy();
  res.json('Successfully logged out');
});


module.exports = router;
