import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// CSS
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Onetime from './components/billing/Onetime';
import Recurrent from './components/billing/Recurrent';
import Footer from './components/layout/Footer';

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path = "/" component={ Landing } />
            <Route exact path = "/login" component={ Login } />
            <Route exact path = "/register" component={ Register } />
            <Route exact path = "/onetime" component={ Onetime } />
            <Route exact path = "/recurrent" component={ Recurrent } />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
