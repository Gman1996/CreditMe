const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.secretKey = !isEmpty(data.secretKey) ? data.secretKey : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  let passed = true;
  if (Validator.isEmpty(data.firstname)) {
    passed = false;
    errors.firstname = 'First Name field is required';
  }

  if (Validator.isEmpty(data.lastname)) {
    passed = false;
    errors.lastname = 'Last Name field is required';
  }

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 }) && passed === true) {
    errors.firstlength = 'First Name must be between 2 and 30 characters';
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 }) && passed === true) {
    errors.lastlength = 'Last Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.email)) {
    passed = false;
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email) && passed === true) {
    errors.emailvalid = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    passed = false;
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.secretKey)) {
    errors.secretKey = 'Secret Key field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 }) && passed === true) {
    errors.passwordlength = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2match = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
