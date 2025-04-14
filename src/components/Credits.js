import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10)
    };
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleAmountChange = (e) => {
    this.setState({ amount: parseFloat(e.target.value) });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date
    };
    this.props.addCredit(newCredit);
    this.setState({ description: '', amount: 0 });
  }

  render() {
    return (
      <div>
        <h1>Credits</h1>
        <Link to="/">Return to Home</Link>
        
        <AccountBalance accountBalance={this.props.accountBalance} />
        
        <h2>Add Credit</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Description:</label>
            <input 
              type="text" 
              value={this.state.description}
              onChange={this.handleDescriptionChange} 
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input 
              type="number" 
              step="0.01"
              min="0"
              value={this.state.amount}
              onChange={this.handleAmountChange} 
              required
            />
          </div>
          <button type="submit">Add Credit</button>
        </form>

        <h2>Credit History</h2>
        <ul>
          {this.props.credits.map((credit, index) => (
            <li key={index}>
              Description: {credit.description} | 
              Amount: ${credit.amount.toFixed(2)} | 
              Date: {credit.date}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Credits;