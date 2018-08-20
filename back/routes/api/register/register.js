const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../../validation/Register');
const isEmptyObj = require('../../../validation/is-empty');
const CheckUnique = require('./checkUnique');

// Get env Variables
require('dotenv').config();

// Load User model
const User = require('../../../models/User');

// @route   GET api/user/test
// @desc    Tests user register route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  async function confirmRegistration(){
    // Create new class object
    let Check = new CheckUnique(req.body.email, req.body.secretKey);

    await Check.checkSecretKey();
    await Check.checkEmail();

    const rules = {
      secretKey: {value: Check.secretKeyIsFound()},
      email: {value: Check.emailisFound()}
    }

    handleErrors(rules);

    if(isEmptyObj(errors)){
      save();
    }
  }
    confirmRegistration();

    let handleErrors = (rules)=>{
      if(rules.secretKey.value){
        errors.secretKeyexists = 'Secret Key is being used by another user';
        return res.status(400).json(errors);
      }

      if(rules.email.value){
        errors.emailexists = 'Email already exists';
        return res.status(400).json(errors);
      }
    }

    let save = () =>{
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        secretKey: req.body.secretKey,
        password: req.body.password,
        password2: req.body.password2
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
});

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get(
  '/current-register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
