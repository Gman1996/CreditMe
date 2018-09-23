import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
		<div className="nav-child-logo">
			<Link to="/"><div className="Creditme-logo">
			</div>
    </Link>
			<div>
				<div className="burger"></div>
				<div className="burger"></div>
				<div className="burger"></div>
			</div>
		</div>

		<div className="nav-nested">
			<div className="nav-child">
				<Link to="/verifybvn"><span className="lnr lnr-magnifier"></span> Verify BVN</Link>
			</div>
			<div className="nav-child">
				<Link to="/register"><span className="lnr lnr-user"></span> Create Account</Link>
			</div>
			<div className="nav-child">
				<Link to="/login"><span className="lnr lnr-lock"></span> Login</Link>
			</div>
		</div>
	</div>
    );
  }
}

export default Navbar;
