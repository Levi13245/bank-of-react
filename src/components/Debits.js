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
      <div>
        <h1>Debits</h1>
        <Link to="/">Return to Home</Link>
        
        <AccountBalance accountBalance={this.props.accountBalance} />
        
        <h2>Add Debit</h2>
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
          <button type="submit">Add Debit</button>
        </form>

        <h2>Debit History</h2>
        <ul>
          {this.props.debits.map((debit, index) => (
            <li key={index}>
              Description: {debit.description} | 
              Amount: ${debit.amount.toFixed(2)} | 
              Date: {debit.date}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Debits;