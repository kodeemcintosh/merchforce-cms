import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { withAuth } from '@okta/okta-react';

import ResetPasswordForm from './reset-password-form';

function ResetPassword({ auth, match }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(null);


  useEffect(() => checkAuth, []);

  const checkAuth = async () => {

    const nextIsAuthenticated = await auth.isAuthenticated();

    if (nextIsAuthenticated !== isAuthenticated) {

      setIsAuthenticated(nextIsAuthenticated);
    }
  }



  if(isAuthenticated) match.history.push("/");

  return <ResetPasswordForm auth={auth} />
};

export default withRouter(withAuth(ResetPassword));
