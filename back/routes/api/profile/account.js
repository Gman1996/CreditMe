const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// @route   GET api/user/account
// @desc    Get current users account info
// @access  Private
router.get(
  '/account',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const userData = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      secretKey: req.user.secretKey
    }
    return res.json(userData);
  }
);

module.exports = router;
