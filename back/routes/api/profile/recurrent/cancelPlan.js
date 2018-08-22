const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

// Get env Variables
require('dotenv').config();

// @route   get api/user/cancel-plan
// @desc    CANCEL chosen payment plan
// @access  Private
router.get('/cancel-plan/:planId',
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
    };

    axios.post('https://ravesandboxapi.flutterwave.com/v2/gpx/paymentplans/' + req.params.planId + '/cancel',
      data,
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
