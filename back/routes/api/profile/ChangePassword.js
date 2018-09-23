const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Validate = require('../../../validation/validate');

// Load User Discount model
const User = require('../../../models/User');

// @route   POST api/user/password
// @desc    POST Change Password
// @access  Private
router.post(
  '/password',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const userData = {
      oldpassword: req.body.oldpassword,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    }

    const rules = [
      {
        name: 'oldpassword',
        required: true,
        min: 6,
        userInput: userData.oldpassword
      },
      {
        name: 'password',
        required: true,
        min: 6,
        userInput: userData.password
      },
      {
        name: 'confirmPassword',
        required: true,
        userInput: userData.confirmPassword
      }
    ]

    const validate = new Validate(rules);
    const { errors, isValid } = validate.checkInput();

    if (!isValid) {
      const formatedErrors = {
        'oldpassword': errors['oldpassword'],
        'password': errors['password'],
        'confirmPassword': errors['confirmPassword']
      };
      return res.status(400).json({ formatedErrors });
    }

    // Check Password
    bcrypt.compare(userData.oldpassword, req.user.password).then(isMatch => {
      let errors = {};
      if (isMatch) {
        // Hash new password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(userData.password, salt, (err, hash) => {
            if (err) throw err;
            userData.password = hash;

            // Update user password
            User.findOneAndUpdate(
              { email: req.user.email },
              { $set: {password: userData.password} },
              { new: true }
            ).then(newUser => {
              return res.json(newUser)
            });
        });
      });
    }
    else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
    });
  });

module.exports = router;
