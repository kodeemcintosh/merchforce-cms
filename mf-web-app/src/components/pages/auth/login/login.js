import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
// import { useStore } from '../../../../hooks/useStore';
// import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import LoginForm from './login-form';

export default withAuth(class Login extends React.Component {
  state = {
    isAuthenticated: null
  };

  async componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    let { auth } = { ...this.props };
    let { isAuthenticated } = { ...this.state };

    const nextIsAuthenticated = await auth.isAuthenticated();

    if (nextIsAuthenticated !== isAuthenticated) {

      this.setState({ isAuthenticated: nextIsAuthenticated });
    }
  }

  render() {
    return this.state.isAuthenticated ? <Redirect to='/' /> : <LoginForm auth={this.props.auth} />
  }
});
