import React, { Component } from 'react';

class AccountBalance extends Component {
  render() {
    return (
      <div className="balance-container">
        <h2>Account Balance</h2>
        <div className="balance-amount">${this.props.accountBalance.toFixed(2)}</div>
      </div>
    );
  }
}

export default AccountBalance;