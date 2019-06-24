import React, { useState } from 'react';
import { Link } from 'react-router';
import { useStore } from '../../../../hooks/useStore';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(function LoginForm({ auth }) {
  const [ store, setStore ] = useStore();
  const [ emailInput, setEmailInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ sessionToken, setSessionToken ] = useState('');
  const [ isInvalidLogin, setIsInvalidLogin ] = useState(false);
  const [ sessionToken, setSessionToken ] = useState(null);

  const oktaAuth = new OktaAuth({ url: process.env.MERCHFORCE_BASE });

  const handleEmailInput = (e) => setEmailInput(e.target.value)
  const handlePasswordInput = (e) => setPasswordInput(e.target.value);


  const handleLogin = async () => {
    setIsLoading(true);

    oktaAuth.signIn({
      email: email,
      password: password
    })
    .then((res) => setSessionToken(res.sessionToken), setIsLoading(false))
    .catch((err) => setIsInvalidLogin(true));

    if(!isInvalidLogin) {

    }
  }

  if(sessionToken) {
    auth.redirect({ sessionToken: sessionToken });
    return null;
  }

  if(isLoading) {
    return (
      <div className="login">
        <div>LOADING SCREEN</div>
      </div>
    );
  }

  return(
    <div className="login">
      <form onSubmit={handleLogin}>
        {isInvalidLogin ? <label>Username or password is invalid</label> : null}
        <input placeholder="email" value={emailInput} onChange={handleEmailInput}></input>
        <input type="password" placeholder="password" value={passwordInput} onChange={handlePasswordInput}></input>
        <input id="login-submit" type="submit" value="Submit" />
      </form>
      <Link to="/register">register</Link>
    </div>
  );
});
