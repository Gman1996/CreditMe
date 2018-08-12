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
  amount: "2000",
  name: "The Premium Plan",
  interval: "monthly",
  duration: "12",
  seckey: "FLWSECK-5d456bf284bb60fc0804f640a8d5ed87-X"
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
