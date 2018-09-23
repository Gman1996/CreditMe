import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      secretKey: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register = () =>{
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      secretKey: this.state.secretKey,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    console.log(newUser);

    axios.post('api/user/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    const { errors } = this.state;
    console.log(this.state.errors.formatedErrors);
    return (
      <div className="limiter">
    		<div className="container-login100">
    			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
    				<form className="login100-form validate-form">
    					<span className="login100-form-title p-b-55">
    						Register
    					</span>

              <div className="error-message">
                {(errors.formatedErrors) ? errors.formatedErrors.firstname : ''}
              </div>
    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<input className="input100" type="text" name="firstname" placeholder="First Name" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-user"></span>
    						</span>
    					</div>

              <div className="error-message">
                {(errors.formatedErrors) ? errors.formatedErrors.lastname : ''}
              </div>
    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<input className="input100" type="text" name="lastname" placeholder="Last Name" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-users"></span>
    						</span>
    					</div>

              <div className="error-message">
                {(errors.formatedErrors) ? errors.formatedErrors.email : ''}
              </div>

              <div className="error-message">
                {(errors.emailexists) ? errors.emailexists : ''}
              </div>
    					<div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
    						<input className="input100" type="email" name="email" placeholder="Email" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-envelope"></span>
    						</span>
    					</div>

              <div className="rave-info">
                Create <a href="https://ravesandbox.flutterwave.com/" target="_blank" rel="noopener noreferrer">Rave account</a> to acquire secret key
              </div>

              <div className="error-message">
                {(errors.formatedErrors) ? errors.formatedErrors.secretKey : ''}
              </div>

              <div className="error-message">
                {(errors.secretKeyexists) ? errors.secretKeyexists : ''}
              </div>
    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<input className="input100" type="text" name="secretKey" placeholder="Secret Key" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-book"></span>
    						</span>
    					</div>

              <div className="error-message">
                {(errors.formatedErrors) ? errors.formatedErrors.password : ''}
              </div>
    					<div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
    						<input className="input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-lock"></span>
    						</span>
    					</div>

              <div className="error-message">
                {(errors.formatedErrors) ? errors.formatedErrors.confirmPassword: ''}
              </div>
    					<div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
    						<input className="input100" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-lock"></span>
    						</span>
    					</div>

    					<div className="container-login100-form-btn p-t-25">
    						<button type="button" className="login100-form-btn" onClick={this.register}>
    							Register
    						</button>
    					</div>

    					<div className="text-center w-full p-t-42 p-b-22">
    						<span className="txt1">
    							Or login with
    						</span>
    					</div>

    					<a href="#" className="btn-face m-b-10">
    						<i className="fa fa-facebook-official"></i>
    						Facebook
    					</a>

    					<a href="#" className="btn-google m-b-10">
    						<img src="landing/images/icons/icon-google.png" alt="GOOGLE" />
    						Google
    					</a>
    				</form>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default Register;
