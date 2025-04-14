import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
      credits: [],
      debits: []
    };
  }

  componentDidMount() {
    // Fetch credits data
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ credits: data });
        this.calculateBalance();
      });

    // Fetch debits data
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ debits: data });
        this.calculateBalance();
      });
  }

  calculateBalance = () => {
    const totalCredits = this.state.credits.reduce((total, credit) => total + credit.amount, 0);
    const totalDebits = this.state.debits.reduce((total, debit) => total + debit.amount, 0);
    const balance = totalCredits - totalDebits;
    this.setState({ accountBalance: balance });
  }

  addCredit = (credit) => {
    const newCredits = [...this.state.credits, credit];
    this.setState({ credits: newCredits }, () => {
      this.calculateBalance();
    });
  }

  addDebit = (debit) => {
    const newDebits = [...this.state.debits, debit];
    this.setState({ debits: newDebits }, () => {
      this.calculateBalance();
    });
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile 
        userName={this.state.currentUser.userName} 
        memberSince={this.state.currentUser.memberSince} 
      />
    );
    const LogInComponent = () => (
      <Login 
        user={this.state.currentUser} 
        mockLogIn={this.mockLogIn} 
      />
    );
    const CreditsComponent = () => (
      <Credits 
        credits={this.state.credits} 
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits 
        debits={this.state.debits} 
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;