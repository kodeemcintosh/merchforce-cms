import React, { useState, useEffect } from 'react';


import Login from './login/login';
import Register from './register/register';
import ResetPassword from './reset-password';
import { withAuth } from '@okta/okta-react';



export const Auth = ({ match }) => {
  return (
    <div className="auth-router">
      {/* <Switch>
        {/* <Route exact path={`${match.url}`} component={() => <Redirect to={`${match.url}/login`} />} /> */}
        <Route exact path={`${match.url}/login`} component={Login} />
        <Route path={`${match.url}/register`} component={Register} />
        <Route path={`${match.url}/reset-password`} component={ResetPassword} />
      </Switch> */}
    </div>
  );
}

export default withAuth(function AuthCheck({ auth }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(null);

  useEffect(async () => {
    const isAuth =  await auth.isAuthenticated();

    if(isAuth !== isAuthenticated) {
      setIsAuthenticated(isAuth);
    }
  }, [auth]);

  // if(isAuthenticated === null) return null;

  if(!isAuthenticated) {
    auth.login("/login");
  }


  return <Redirect to="/storefront" />;
});