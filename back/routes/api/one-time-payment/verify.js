const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/test', (req, res) => res.json({
  works: 'true'
}));

// @route   POST api/pay/verify
// @desc    Make Payment / Returning Response
// @access  Public
router.post('/verify', (req, res) => {
  let txref = req.query.txref;
  let flwref = req.query.flwref;
  let data = JSON.parse(res.socket._httpMessage.req.body.resp);
  let innerData = data.tx;
  let status = innerData.status;
  let chargeResponseCode = innerData.chargeResponseCode;
  let currency = innerData.currency;
  let amount = innerData.amount;

  if (status === 'successful' && chargeResponseCode === "00" && currency === "NGN") {
    return res.json({success: true});
  }
  return res.status(400).json(data);
});

module.exports = router;
