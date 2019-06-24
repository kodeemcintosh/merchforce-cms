import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

export default withAuth(function RegistrationForm({ auth }) {
  const oktaAuth = new OktaAuth({ url: process.env.MERCHFORCE_BASE});
  //user info
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordAgain, setPasswordAgain ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ secondaryEmail, setSecondaryEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ employer, setEmployer ] = useState('');
  //shipping info
  const [ street, setStreet ] = useState('');
  const [ aptSuite, setAptSuite ] = useState('');
  const [ city, setCity ] = useState('');
  const [ stateProvince, setStateProvince ] = useState('');
  const [ postalCode, setPostalCode ] = useState('');
  const [ country, setCountry ] = useState('');

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isValidPassword, setIsValidPassword ] = useState(false);
  const [ isMatchingPassword, setIsMatchingPassword ] = useState(false);
  const [ sessionToken, setSessionToken ] = useState(null);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordAgain = (e) => setPasswordAgain(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleSecondaryEmail = (e) => setSecondaryEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleEmployer = (e) => setEmployer(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handleAptSuite = (e) => setAptSuite(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleStateProvince = (e) => setStateProvince(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const handleRegisterForm = () => {
    e.preventDefault();
    setIsLoading(true);
    validatePassword();

    axios.post('/register', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          verified: false,
          username,
          password,
          firstName,
          lastName,
          email,
          secondaryEmail,
          phone,
          employer
        },
        shipping: {
          street,
          aptSuite,
          city,
          stateProvince,
          postalCode,
          country
        }
      })
    }).then((user) => {
      oktaAuth.signIn({
        username: email,
        password: password
      })
    }).then((res) => setSessionToken(res.sessionToken))
    .catch((err) => console.log("Error in registration-form: ", err));

    setIsLoading(false);
  }

  const validatePassword = () => {
    setIsValidPassword(password.length > 8);
    setIsMatchingPassword(password === passwordAgain);
  }

  const checkAuth = async () => {
    const tkn = await auth.getIdToken();
    if (tkn) {
      setSessionToken(tkn);
    }
  }

  useEffect(() => {
    checkAuth();
  })

  if(sessionToken) {
    auth.redirect({ sessionToken: sessionToken });
    return null;
  }

  return(
    <div className="registration-form">
      <form onSubmit={handleRegisterForm}>
        <div className="user-form">
          <input placeholder="username" value={username} onChange={handleUsername} />
          {!isValidPassword ? <label>Password must be longer than 8 characters</label> : null}
          {!isMatchingPassword ? <label>Passwords must match</label> : null}
          <input placeholder="password" value={password} onChange={handlePassword} />
          <input placeholder="re-type password" value={passwordAgain} onChange={handlePasswordAgain} />
          <input placeholder="first name" value={firstName} onChange={handleFirstName} />
          <input placeholder="last name" value={lastName} onChange={handleLastName} />
          <input placeholder="email" value={email} onChange={handleEmail} />
          <input placeholder="secondary email" value={secondaryEmail} onChange={handleSecondaryEmail} />
          <input placeholder="phone" value={phone} onChange={handlePhone} />
          <input placeholder="employer" value={employer} onChange={handleEmployer} />
        </div>
        <div className="shipping-form">
          <input placeholder="street" value={street} onChange={handleStreet} />
          <input placeholder="apt/suite" value={aptSuite} onChange={handleAptSuite} />
          <input placeholder="city" value={city} onChange={handleCity} />
          <input placeholder="state/province" value={stateProvince} onChange={handleStateProvince} />
          <input placeholder="postal code" value={postalCode} onChange={handlePostalCode} />
          <input placeholder="country" value={country} onChange={handleCountry} />
        </div>
        <input id="register-submit" type="submit" value="Submit" />
      </form>
      <Link to="/login" />
      <Link to="/reset-password" />
    </div>
  );
});