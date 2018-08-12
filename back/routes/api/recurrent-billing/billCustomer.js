const express = require('express');
const router = express.Router();
const axios = require('axios');

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
const data = {
  PBFPubKey: "FLWPUBK-d12e695bcd440eebe04634014dce8ce1-X",
  cardno: "5399830240760817",
  cvv: "473",
  expirymonth: "12",
  expiryyear: "20",
  currency: "NGN",
  country: "NG",
  payment_plan: 462,
  amount: "1000",
  email: "betatesting11@gmail.com",
  phonenumber: "08147471248",
  firstname: "Beta",
  lastname: "Tester",
  IP: "355426087298442",
  txRef: "MC-" + Date.now(),// your unique merchant reference
  meta: [{metaname: "flightID", metavalue: "123949494DC"}],
  redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
  device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c"
};

axios.post('https://ravesandboxapi.flutterwave.com/v2/gpx/paymentplans/create',
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
