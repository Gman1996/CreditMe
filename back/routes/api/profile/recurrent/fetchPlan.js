const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

// Get env Variables
require('dotenv').config();

// @route   get api/user/fetch-plan
// @desc    FETCH chosen payment plans
// @access  Private
router.post('/fetch-plan',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const data = {
      seckey: 'FLWSECK-5d456bf284bb60fc0804f640a8d5ed87-X', //Hard Coded for Testing Purposes
      //seckey: req.user.secretKey
      id: req.body.planId,
      q: req.body.planName
    };
    axios.get(process.env.FETCH_PAYMENT_PLAN,
      {
        params: {
          seckey: data.seckey,
          id: data.id,
          q: data.planName
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
