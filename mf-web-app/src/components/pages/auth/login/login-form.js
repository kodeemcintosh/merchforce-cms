import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useStore from '../../../../hooks/useStore';
// import { withAuth } from '@okta/okta-react';
import useOkta from './../../../../hooks/useOkta';

export default function LoginForm() {
// export default withAuth(function LoginForm({ auth }) {
  // const [ store, setStore ] = useStore();
  const [ emailInput, setEmailInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isInvalidLogin, setIsInvalidLogin ] = useState(false);
  const [ sessionToken, setSessionToken ] = useState(null);

  let okta, { auth } = useOkta();

  const handleEmailInput = (e) => setEmailInput(e.target.value)
  const handlePasswordInput = (e) => setPasswordInput(e.target.value);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      okta.signIn({
        email: emailInput,
        password: passwordInput
      })
      .then((res) => JSON.parse(res))
      .then((res) => {
        if(res.status !== 'SUCCESS') {
          setIsInvalidLogin(true);
          return;
        }

        setSessionToken(res.sessionToken);
        setIsLoading(false);
      })
      .catch((err) => console.log("Error with login", err));

      // let response = await axios.post('/login', payload);
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
      <button onClick={handleLogin}>Login</button>
      <Link to="/register">register</Link>
    </div>
  );
};
// });
