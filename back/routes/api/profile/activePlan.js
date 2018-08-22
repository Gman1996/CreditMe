const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const isEmpty = require('../../../validation/is-empty');

// Load User Discount model
const ActivePlan = require('../../../models/ActivePlan');

// @route   POST api/users/active-plan
// @desc    POST ActivePlan
// @access  Private
router.post(
  '/active-plan',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const userData = {
      user: req.user.id,
      planId: req.body.planId
    }

    ActivePlan.findOne( {user: req.user.id} ).then(user =>{
      if (user) {
        // Update user planId
        ActivePlan.findOneAndUpdate(
          { user: req.user.id },
          { $set: { planId: userData.planId } },
          { new: true }
        ).then(newPlanId => {
          return res.json(newPlanId)
        });
      }
      else{
        new ActivePlan(userData)
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      }
    })
});

module.exports = router;
