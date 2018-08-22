const isEmpty = require('./is-empty');
const Validator = require('validator');

class Validate{
  constructor(rules){
    this.rules = rules;
  }

  checkInput = ()=>{
    let errors = [];
    let password = '';
    let confirmPassword = '';
    this.rules.map((values) => {
      let name = values.name;
      if (values.required === true && isEmpty(values.userInput)) {
        errors[name] = `${values.name} is Required`;
      }

      if (values.name === 'email' && !Validator.isEmail(values.userInput) && isEmpty(errors['email'])) {
        errors['invalidEmail'] = `${values.name} is Invalid`;
      }

      if (values.min && !Validator.isLength(values.userInput, { min: values.min }) && !isEmpty(values.userInput)) {
        errors[name] = `${values.name} must be at least ${values.min} characters`;
      }

      if (values.name === 'confirmPassword' ) {
          confirmPassword = values.userInput;
      }

      if (values.name === 'password' ) {
        password = values.userInput;
      }
    });
      (this.checkPassword(password, confirmPassword)) ? null : errors['confirmPassword'] = 'Passwords must match'
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  checkPassword = (password, confirmPassword)=>{
    if (!Validator.equals(password, confirmPassword)) {
      return false;
    }
    return true;
  }
}

module.exports = Validate;
