import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    };
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user};
    updatedUser.userName = e.target.value;
    this.setState({user: updatedUser});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.mockLogIn(this.state.user);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/userProfile" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User Name</label>
            <input 
              type="text" 
              name="userName" 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;