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
      <div className="container">
        <h1>Credits</h1>
        <Link to="/" className="nav-link">Return to Home</Link>
        
        <AccountBalance accountBalance={this.props.accountBalance} />
        
        <div className="form-container">
          <h2>Add Credit</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Description:</label>
              <input 
                type="text" 
                value={this.state.description}
                onChange={this.handleDescriptionChange} 
                required
              />
            </div>
            <div className="form-group">
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
        </div>

        <div className="transaction-list">
          <h2>Credit History</h2>
          {this.props.credits.map((credit, index) => (
            <div className="transaction-item" key={index}>
              <span>
                <strong>{credit.description}</strong> ({credit.date})
              </span>
              <span>${credit.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Credits;