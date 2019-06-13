
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router';
import { useStore } from '../../hooks/useStore';
import axios from 'axios';

export function Login({ authorize }) {
  const [ store, setStore ] = useStore();
  const [ emailInput, setEmailInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isInvalidLogin, setIsInvalidLogin ] = useState(false);

  const handleEmailInput = (e) => setEmailInput(e.target.value)
  const handlePasswordInput = (e) => setPasswordInput(e.target.value);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const payload = {
        email: emailInput,
        password: passwordInput
      }

      let response = await axios.post('/login', payload);
      response = JSON.parse(respone);

      if(response.status === 200) {
        authorize();

        let user = response.user;
        user.role = response.headers.role;

        await sessionStorage.setItem('tkn', response.headers.tkn);
        setStore((prevStore) => ({ ...prevStore, user }));

        setIsLoading(false);
        setRedirectToHome(true);
      }

      setIsInvalidLogin(true);
    } catch(err) {
      console.warn(err);
    }
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
        <button onClick={handleLogin}>Login</button>
      </form>
      <Link to="/register">register</Link>
    </div>
  );
}
