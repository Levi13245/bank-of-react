import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
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
    const newDebit = {
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date
    };
    this.props.addDebit(newDebit);
    this.setState({ description: '', amount: 0 });
  }

  render() {
    return (
      <div className="container">
        <h1>Debits</h1>
        <Link to="/" className="nav-link">Return to Home</Link>
        
        <AccountBalance accountBalance={this.props.accountBalance} />
        
        <div className="form-container">
          <h2>Add Debit</h2>
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
            <button type="submit">Add Debit</button>
          </form>
        </div>

        <div className="transaction-list">
          <h2>Debit History</h2>
          {this.props.debits.map((debit, index) => (
            <div className="transaction-item" key={index}>
              <span>
                <strong>{debit.description}</strong> ({debit.date})
              </span>
              <span>${debit.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Debits;