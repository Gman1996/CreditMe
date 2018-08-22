const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load User Discount model
const Discount = require('../../../models/Discount');

// @route   POST api/users/discount
// @desc    POST Create or Update User Discounts
// @access  Private
router.post(
  '/discount',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const discountData = {
      user: req.user.id,
      status: req.body.status,
      percentage: req.body.percentage
    }

    Discount.findOne({ user: discountData.user }).then(found => {
      if (found) {
        // Update
        Discount.findOneAndUpdate(
          { user: discountData.user },
          { $set: discountData },
          { new: true }
        ).then(found => res.json(found));
      }
      else {
        // Create
          // Save Profile
          new Discount(discountData).save().then(discount => res.json(discount));
      }
    });
});

module.exports = router;
