const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');
const { API_KEY } = require('../config');


// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors allows us to get resources from other servers
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


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


app.listen(process.env.PORT || 8080);