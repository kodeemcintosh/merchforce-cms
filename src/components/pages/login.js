
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router';
import { useStore } from '../../store';
import axios from 'axios';

export function Login() {
  const [ store, setStore ] = useStore();
  const [ emailInput, setEmailInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ redirectToHome, setRedirectToHome ] = useState(false);
  const [ redirectToUnautherized, setRedirectToUnautherized ] = useState(false);

  const handleEmailInput = (e) => setEmailInput(e.target.value)
  const handlePasswordInput = (e) => setPasswordInput(e.target.value);

  const handleLogin = async () => {
    setIsLoading(true);

    const payload = {
      email: emailInput,
      password: passwordInput
    }

    let response = await axios.post('/login', payload);
    setIsLoading(false);

    if(response.status === 200) {
      await sessionStorage.setItem('user', response.user);
      setStore((prevStore) => ({ ...prevStore, user: response.user}));

      setRedirectToHome(true);
    } else {
      setRedirectToUnautherized(true);
    }
  }

  if(redirectToHome) {
    return (
      <Redirect to="/home" />
    )
  }

  if(redirectToUnautherized) {
    return (
      <Redirect to="/unautherized" />
    )
  }

  if(isLoading) {
    <div>LOADING SCREEN</div>
  }


  return(
    <div className="login">
      <form onSubmit={handleLogin}>
        <input placeholder="email" value={emailInput} onChange={handleEmailInput}></input>
        <input placeholder="password" value={passwordInput} onChange={handlePasswordInput}></input>
        <button onClick={handleLogin}>Login</button>
      </form>
      <Link to="/register">register</Link>
    </div>
  );
}
