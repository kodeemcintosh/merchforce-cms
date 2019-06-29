import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// import { useStore } from '../../../../hooks/useStore';
// import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {

    const nextIsAuthenticated = await this.props.auth.isAuthenticated();

    if (nextIsAuthenticated !== this.state.isAuthenticated) {

      this.setState({ isAuthenticated: nextIsAuthenticated });
    }
  }

  // const login = async () => await auth.login("/login");
  goToLogin = async () => await this.props.history.push('/login');
  goToRegister = async () => await this.props.history.push('/register');

  handleLogout = async () => await this.props.auth.logout();

  render() {

    if(!this.state.isAuthenticated) {
      return (
        <div className="welcome">WELCOME
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        </div>
      );
    }

    return (
      <div className="home">HOME<button onClick={this.handleLogout}>logout</button></div>
    );
  }

  // return isAuthenticated ? <Redirect to='/storefront' /> : <LoginForm auth={auth} />
};

export default withRouter(withAuth(Welcome));
