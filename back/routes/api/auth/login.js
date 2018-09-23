const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');
const Validate = require('../../../validation/validate');
const isEmpty = require('../../../validation/is-empty');

// Load User model
const User = require('../../../models/User');

// @route   GET api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const rules = [
    {
      name: 'email',
      required: true,
      userInput: email
    },
    {
      name: 'Login password',
      required: true,
      userInput: password
    }
  ]

  const validate = new Validate(rules);
  const { errors, isValid } = validate.checkInput();

  if (!isValid) {
    let formatedErrors = {
      'email': errors['email'],
      'invalidEmail': errors['invalidEmail'],
      'Login password': errors['Login password']
    };
    return res.status(400).json({ formatedErrors });
  }

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.firstname }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/user/current-login
// @desc    Return current user
// @access  Private
router.get(
  '/current-login',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.firstname,
      email: req.user.email
    });
  }
);

module.exports = router;
