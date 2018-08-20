// Load User model
const User = require('../../../models/User');

class CheckUnique {
  constructor(email, secretKey){
    this.email = email;
    this.secretKey = secretKey;

    // Assigned variables in constructor
    let secretKeyChecked = false;
    let emailChecked = false;

    // Bind Variables Because of Context
    this.secretKeyChecked = secretKeyChecked;
    this.emailChecked = emailChecked;
  }

  async checkSecretKey(){
    const user = await User.findOne({ secretKey: this.secretKey });
      if (user) {
        this.secretKeyChecked = true;
      }
  }

  async checkEmail(){
    const user = await User.findOne({ email: this.email });
      if (user) {
        this.emailChecked = true;
      }
  }

  secretKeyIsFound = ()=>{
    return this.secretKeyChecked;
  }

  emailisFound = () =>{
    return this.emailChecked;
  }
}

module.exports = CheckUnique;
