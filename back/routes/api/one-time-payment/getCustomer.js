const express = require('express');
const router = express.Router();
const axios = require('axios');
const randomstring = require("randomstring");

// Get env Variables
require('dotenv').config();

router.get('/test', (req, res) => res.json({
  works: 'true'
}));

// @route   api/pay/login
// @desc    POST Customer Details / Redirect After
// @access  Public
router.post('/customer-details', (req, res) => {
  let random = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let account_owner = req.body.account_owner;
  let customer_email = req.body.customer_email;
  let PBFPubKey = process.env.PUBLIC_KEY;
  let amount = req.body.amount;
  let customer_phone = req.body.customer_phone;
  let currency = req.body.currency;
  let payment_method = "both";
  let txref = 'MC-' + random + Date.now();
  let redirect_url = process.env.REDIRECT;

  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = {
    firstname,
    lastname,
    account_owner,
    customer_email,
    PBFPubKey,
    amount,
    customer_phone,
    currency,
    payment_method,
    txref,
    redirect_url
  };

  axios.post(process.env.ONE_TIME_PAYMENT,
      data,
      headers)
    .then(function(response) {
      let data = response.data;
      let raveLink = data.data.link;
      if(data.status === "success"){
        return res.json(data);
        res.redirect(raveLink);
      }
    })
    .catch(function(error) {
      return res.json(error);
    });
});

module.exports = router;
