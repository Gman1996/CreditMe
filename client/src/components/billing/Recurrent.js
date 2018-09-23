import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Recurrent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false,
      firstname: '',
      lastname: '',
      customer: '',
      payee: '',
      currency: 'NG',
      amount: 0
    };

  }

  toggle = () =>{
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  preview = (e) =>{
    e.preventDefault();
    let userData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      customer: this.state.customer,
      payee: this.state.payee,
      currency: this.state.currency,
      amount: this.state.amount
    }
    console.log(userData);
  }

  render() {
    return (
      <div className="limiter">
    		<div className="container-login100">
    			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
    				<form className="login100-form validate-form">
    					<span className="login100-form-title p-b-55">
    						Recurrent Billing
    					</span>

    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<input className="input100" type="text" name="firstname" placeholder="First Name" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-user"></span>
    						</span>
    					</div>

    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<input className="input100" type="text" name="lastname" placeholder="Last Name" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-users"></span>
    						</span>
    					</div>

    					<div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
    						<input className="input100" type="email" name="customer" placeholder="Your Email" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-envelope"></span>
    						</span>
    					</div>

    					<div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
    						<input className="input100" type="email" name="payee" placeholder="Payee's Email" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-envelope"></span>
    						</span>
    					</div>

    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<select name="currency" className="input100" onChange={this.handleChange}>
    							<option value="NG" defaultValue>Default currency NG</option>
    						  <option value="GH">GH</option>
    						  <option value="US">US</option>
    						  <option value="SG">SG</option>
    						  <option value="ZB">ZB</option>
    						  <option value="R">R</option>
    						</select>
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-pointer-right"></span>
    						</span>
    					</div>

    					<div className="wrap-input100 validate-input m-b-16" data-validate="Required Field">
    						<input className="input100" type="number" name="amount" placeholder="Amount" onChange={this.handleChange} />
    						<span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<span className="lnr lnr-briefcase"></span>
    						</span>
    					</div>

    					<div className="container-login100-form-btn p-t-25">
    						<a href="#modal" onClick={ this.toggle }><button type="button" className="login100-form-btn">
    							Preview
    						</button>
    					</a>
    					</div>
    				</form>
    			</div>
    		</div>



        <div>
          <Modal isOpen={this.state.modal} className="modal-content">
            <div id="modal">
              <div className="modal-content">
              <ModalHeader>
                <div className="header">
                  <h2>Preview Payment</h2>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="copy">
          				<p className="pmodal">Name: <input className="input100" type="text" name="name" placeholder="Name" /></p>
          				<p className="pmodal">Your Email: <input className="input100" type="email" name="email" placeholder="Your Email" /></p>
          				<p className="pmodal">Payee's Email: <input className="input100" type="email" name="payee" placeholder="Payee's Email" /></p>
          				<p className="pmodal">Currency:
          					<select name="currency" className="input100">
          						<option value="NG" defaultValue>Default currency NG</option>
          						<option value="volvo">NG</option>
          						<option value="volvo">GH</option>
          						<option value="volvo">US</option>
          						<option value="saab">SG</option>
          						<option value="opel">ZB</option>
          						<option value="audi">R</option>
          					</select>
          				</p>
          				<p className="pmodal">Amount: <input className="input100" type="number" name="amount" placeholder="Amount" /></p>
          			</div>
              </ModalBody>

              <ModalFooter>
                  <button type="button" onClick={this.toggle} className="btn btn-danger">Close</button>
                  <button type="button" onClick={ (e) => this.preview(e) } className="btn btn-success">Proceed</button>
              </ModalFooter>

            </div>
          </div>
          </Modal>
        </div>

    	</div>
    );
  }
}

export default Recurrent;
