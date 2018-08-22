const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');
const Validate = require('../../../../../validation/validate');

// Get env Variables
require('dotenv').config();

// @route   get api/user/fetch-subscribers
// @desc    GET chosen subscribers for current user
// @access  Private
router.post('/fetch-subscribers',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = {
      seckey: 'FLWSECK-5d456bf284bb60fc0804f640a8d5ed87-X', //Hard Coded for Testing Purposes
      //seckey: req.user.secretKey
      id: req.body.subscriptionId,
      email: req.body.email
    };

    const rules = [
      {
        name: 'email',
        userInput: data.email
      }
    ]

    let validate = new Validate(rules);
    const { errors, isValid } = validate.checkInput();

    if (!isValid) {
      const formatedErrors = {
        'invalidEmail': errors['invalidEmail'],
      };
      return res.status(400).json({ formatedErrors });
    }

    axios.get(process.env.LIST_SUBSCRIBERS,
        {
          params: {
          seckey: data.seckey,
          id: data.id,
          email: data.email
          }
        },
        headers)
      .then(function(response) {
        if (response.data.status === 'success') {
          return res.json(response.data);
        }
        return res.json({
          success: false
        });
      })
      .catch(function(error) {
        console.log(error);
        return res.json(JSON.parse(error));
      });
  });

module.exports = router;
