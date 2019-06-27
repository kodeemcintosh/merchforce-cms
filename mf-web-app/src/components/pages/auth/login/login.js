import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
// import { useStore } from '../../../../hooks/useStore';
// import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import LoginForm from './login-form';

export default withAuth(function Login({ auth }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(null);


  useEffect(() => {
    const authenticated = auth.isAuthenticated();
    console.log('login.js isAuthenticated', authenticated);

    if (authenticated !== isAuthenticated) {
      setIsAuthenticated(authenticated);
    }
  }, [auth])

  return isAuthenticated ? <Redirect to='/' /> : <LoginForm auth={auth} />
});
