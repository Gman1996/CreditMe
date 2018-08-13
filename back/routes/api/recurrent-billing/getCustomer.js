const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get env Variables
require('dotenv').config();

router.get('/test-recurring', (req, res) => res.json({
  works: 'true'
}));

// @route   get api/recurrent-billing/createPayment
// @desc    Create Payment Plan / Get plan id
// @access  Public
router.get('/create-payment ', (req, res) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const random = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });

  let PBFPubKey = process.env.PUBLIC_KEY;
  let cardno = req.body.cardno;
  let cvv = req.body.cvv;
  let expirymonth = req.body.expirymonth;
  let expiryyear = req.body.expiryyear;
  let currency = req.body.currency;
  let country = req.body.country;
  let payment_plan = "fetchfromfunctions";
  let amount = req.body.amount;
  let email = req.body.email;
  let phonenumber = req.body.phonenumber;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let txref = 'MC-' + random + Date.now();
  let redirect_url = process.env.REDIRECT_RECURRENT;

    const data = {
      PBFPubKey,
      cardno,
      cvv,
      expirymonth,
      expiryyear,
      currency,
      country,
      payment_plan,
      amount,
      email,
      phonenumber,
      firstname,
      lastname,
      txRef,
      redirect_url
    };

  axios.post(process.env.BILL_CUSTOMER,
      data,
      headers)
    .then(function(response) {
      return res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
      return res.json(error);
    });
});

module.exports = router;
