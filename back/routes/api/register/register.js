const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');
const isEmpty = require('../../../validation/is-empty');
const CheckUnique = require('./checkUnique');
const Validate = require('../../../validation/validate');

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
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    secretKey: req.body.secretKey,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  const rules = [
    {
      name: 'firstname',
      required: true,
      userInput: newUser.firstname
    },
    {
      name: 'lastname',
      required: true,
      userInput: newUser.lastname
    },
    {
      name: 'email',
      required: true,
      userInput: newUser.email
    },
    {
      name: 'secretKey',
      required: true,
      userInput: newUser.secretKey
    },
    {
      name: 'password',
      required: true,
      min: 6,
      userInput: newUser.password
    },
    {
      name: 'confirmPassword',
      required: true,
      userInput: newUser.confirmPassword
    }
  ]

  let validate = new Validate(rules);
  const { errors, isValid } = validate.checkInput();

  if (!isValid) {
    const formatedErrors = {
      'firstname': errors['firstname'],
      'lastname': errors['lastname'],
      'email': errors['email'],
      'invalidEmail': errors['invalidEmail'],
      'secretKey': errors['secretKey'],
      'password': errors['password'],
      'confirmPassword': errors['confirmPassword']
    };
    return res.status(400).json({ formatedErrors });
  }

  async function confirmRegistration(){
    // Create new class object
    const Check = new CheckUnique(newUser.email, newUser.secretKey);

    await Check.checkSecretKey();
    await Check.checkEmail();

    const uniqueRules = {
      secretKey: {value: Check.secretKeyIsFound()},
      email: {value: Check.emailisFound()}
    }

    handleUniqueErrors(uniqueRules);
  }

  confirmRegistration();

  let handleUniqueErrors = (rules)=>{
    let errors = {};
    if(rules.email.value){
      errors.emailexists = 'Email already exists';
      return res.status(400).json(errors);
    }

    if(rules.secretKey.value){
      errors.secretKeyexists = 'Secret Key is being used by another user';
      return res.status(400).json(errors);
    }

    if(isEmpty(errors)){
      save(newUser);
    }
  }

  let save = (newUser) =>{
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        new User(newUser)
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
