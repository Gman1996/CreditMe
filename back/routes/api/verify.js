const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/test', (req, res) => res.json({
  works: 'true'
}));

// @route   POST api/pay/login
// @desc    Make Payment / Returning Response
// @access  Public

router.post('/verify', (req, res) => {
  let data = JSON.parse(res.socket._httpMessage.req.body.resp);
  let status = data.success;
  let innerData = data.data.data;
  let chargeResponseCode = innerData.chargeResponseCode;
  let currency = innerData.currency;
  let amount = innerData.amount;
  //let amountCharged = innerData.amount;
  if (status === true && chargeResponseCode === "00" && currency === "NGN") {
    return res.json({success: "Payment Completed"});
  }
  return res.status(400).json(data);
});

module.exports = router;
