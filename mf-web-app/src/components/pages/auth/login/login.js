import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
// import { useStore } from '../../../../hooks/useStore';
// import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import LoginForm from './login-form';

export default withAuth(function Login({ auth }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(null);

  const checkAuthentication = async () => {
    const authenticated = await auth.isAuthenticated();

    if (authenticated !== isAuthenticated) {
      setIsAuthenticated(authenticated);
    }
  }

  useEffect(() => {
    checkAuthentication();
  })

  if (isAuthenticated === null) return null;

  return isAuthenticated ? <Redirect to={{ pathname: '/featured' }} /> : <LoginForm />
});
