const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

// Get env Variables
require('dotenv').config();

// @route   get api/user/list-plan
// @desc    LIST all payment plans
// @access  Private
router.get('/list-plan',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const data = {
      seckey: 'FLWSECK-5d456bf284bb60fc0804f640a8d5ed87-X' //Hard Coded for Testing Purposes
      //seckey: req.user.secretKey
    };
    axios.get(process.env.LIST_PAYMENT_PLANS,
      {
        params: {
        seckey: data.seckey
        }
      },
      headers)
    .then(function(response) {
      if(response.data.status === 'success'){
        return res.json(response.data);
      }
      return res.json({success: false});
    })
    .catch(function(error) {
      console.log(error);
      return res.json(error);
    });
});

module.exports = router;
