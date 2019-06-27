import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import useStore from '../../../../hooks/useStore';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import Okta from '../../../../auth/Okta';

// const okta = new Okta();

export default function LoginForm({ auth }) {
  // const [ store, setStore ] = useStore();
  const [ emailInput, setEmailInput ] = useState('kodee.mcintosh');
  const [ passwordInput, setPasswordInput ] = useState('pNyn8_5E');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isInvalidLogin, setIsInvalidLogin ] = useState(false);
  const [ sessionToken, setSessionToken ] = useState(null);

  let okta = Okta();

  const handleEmailInput = (e) => setEmailInput(e.target.value)
  const handlePasswordInput = (e) => setPasswordInput(e.target.value);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await okta.signIn({
        username: emailInput,
        password: passwordInput
      })
      .then((res) => {
        console.log('response------------', res);
        if(res.status !== 'SUCCESS') {
          setIsInvalidLogin(true);
          return;
        }

        setSessionToken(res.sessionToken);
        setIsLoading(false);
      })
      .catch((err) => console.log("Error with login", err));

    } catch(err) {
      console.warn(err);
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
      <Link to="/reset-password">forgot password?</Link>
    </div>
  );
};
