const router = require('express').Router();
const axios = require('axios');



const API_KEY = process.env.ZILLOW_API_KEY || require('../../config').ZILLOW_API_KEY;



router.get('/deepSearch/:address/:citystatezip', (req, res) => {
  axios.get(
    `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${API_KEY}&address=${req.params.address}&citystatezip=${req.params.citystatezip}`,
  )
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});

router.get('/deepComparables/:zpid', (req, res) => {
  axios.get(
    `http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=${API_KEY}&zpid=${req.params.zpid}&count=5`,
  )
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});

module.exports = router;
