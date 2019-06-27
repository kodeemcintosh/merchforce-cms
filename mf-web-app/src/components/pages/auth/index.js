import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Login from './login/login';
import Register from './register/register';
import ResetPassword from './reset-password';



export const Auth = ({ match }) => {
  return (
    <div className="auth-router">
      <Switch>
        {/* <Route exact path={`${match.url}`} component={() => <Redirect to={`${match.url}/login`} />} /> */}
        <Route exact path={`${match.url}/login`} component={Login} />
        <Route path={`${match.url}/register`} component={Register} />
        <Route path={`${match.url}/reset-password`} component={ResetPassword} />
      </Switch>
    </div>
  );
}