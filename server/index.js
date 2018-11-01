const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');
// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Cors

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/search', function (req, res) {
  console.log('hey');

  axios.get('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1gqc0hzifbf_2yr7j&address=16522+78+Ave&citystatezip=Flushing%2C+Ny')
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});

app.get('/deepsearch', function (req, res) {
  console.log('deep search');

  axios.get('http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1gqc0hzifbf_2yr7j&address=16522+78+Ave&citystatezip=Flushing%2C+Ny')
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});

app.get('/jamaica', (req, res) => {
  console.log('jamaica');
  axios.get('http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1gqc0hzifbf_2yr7j&address=16607+81+Ave&citystatezip=Jamaica%2C+Ny')
    .then(response => res.send(response.data))
    .catch(err => console.log(err));

})



app.listen(process.env.PORT || 8080);