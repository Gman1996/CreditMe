import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

  render() {
    return (
      <div className="mycontainer">
    		<div className="onetime">
    			<span className="hover-title">
    					Make One Time Payments
    				<div>
              <Link to="/onetime">
    						<button className="mybutton lnr lnr-chevron-right-circle"></button>
              </Link>
    		    </div>
    		  </span>
    		</div>

    		<div className="recurrent">
    			<span className="hover-title">
    				Be Billed Recurrently
    				<div>
              <Link to="/recurrent">
    						<button className="mybutton lnr lnr-chevron-right-circle"></button>
              </Link>
    			</div>
    			</span>
    		</div>
    	</div>
    );
  }
}

export default Landing;
