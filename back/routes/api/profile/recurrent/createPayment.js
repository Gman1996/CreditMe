const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get env Variables
require('dotenv').config();

router.get('/test-recurring', (req, res) => res.json({
  works: 'true'
}));

// @route   get api/user/create-payment
// @desc    Create Payment Plan / Get plan id
// @access  Public
router.post('/create-payment', (req, res) => {
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

let plan_name = req.body.plan_name;
let amount = req.body.amount;
let interval = req.body.interval;
let duration = (req.body.duration !== "0")? req.body.duration: false;
let seckey = process.env.SECRET;

const data = {
  plan_name,
  amount,
  interval,
  duration,
  seckey
};
return res.json(data);

axios.post(process.env.CREATE_PAYMENT_PLAN,
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
