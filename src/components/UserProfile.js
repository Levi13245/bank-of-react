import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
      <div className="container">
        <h1>User Profile</h1>
        <Link to="/" className="nav-link">Return to Home</Link>
        
        <div className="form-container">
          <div className="form-group">
            <label>Username:</label>
            <p>{this.props.userName}</p>
          </div>
          <div className="form-group">
            <label>Member Since:</label>
            <p>{this.props.memberSince}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;