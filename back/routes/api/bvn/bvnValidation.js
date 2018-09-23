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
router.get('/verify-bvn/:bvnNumber', (req, res) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let seckey = process.env.SECRET;
  let BVN = req.query.bvnNumber;

    const params = {
      seckey
    };
console.log(seckey);
  axios.get(process.env.BVN_VALIDATION + '/' + BVN,
  {
      params: {
        seckey
      },
      headers
  })
    .then(function(response) {
      return res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
      return res.json(error);
    });
});

module.exports = router;
