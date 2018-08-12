const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/test', (req, res) => res.json({
  works: 'true'
}));

// @route   POST api/pay/login
// @desc    Get Customer Details / Redirect After
// @access  Public
router.get('/customer-details', (req, res) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const data = {
    PBFPubKey: "FLWPUBK-d12e695bcd440eebe04634014dce8ce1-X",
    customer_email: "dayoagbolade@gmail.com",
    amount: 2000,
    customer_phone: "08147471248",
    currency: "NGN",
    payment_method: "both",
    txref: "MC-1520443531487",
    redirect_url: "http://localhost:5000/api/customer/verify"
  };

  axios.post('https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/hosted/pay',
      data,
      headers)
    .then(function(response) {
      let data = response.data;
      let raveLink = data.data.link;
      if(data.status === "success"){
        res.redirect(raveLink);
      }
    })
    .catch(function(error) {
      console.log(error);
      return res.json(error.data);
    });
});

module.exports = router;
