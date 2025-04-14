import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <img src="https://picsum.photos/200/200" alt="bank" className="logo"/>
          <h1>Bank of React</h1>
        </header>
        
        <div className="nav-links">
          <Link to="/userProfile" className="nav-link">User Profile</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/credits" className="nav-link">Credits</Link>
          <Link to="/debits" className="nav-link">Debits</Link>
        </div>
        
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Home;