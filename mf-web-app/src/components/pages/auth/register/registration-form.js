import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Okta from '../../../../auth/Okta';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

export default function RegistrationForm({ auth }) {

  const okta = new Okta();
  //user info
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordAgain, setPasswordAgain ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ secondEmail, setSecondEmail ] = useState('');
  const [ mobilePhone, setMobilePhone ] = useState('');
  const [ organization, setOrganization ] = useState('');
  //shipping info
  const [ streetAddress, setStreetAddress ] = useState('');
  const [ aptSuite, setAptSuite ] = useState('');
  const [ city, setCity ] = useState('');
  const [ stateProvince, setStateProvince ] = useState('');
  const [ zipCode, setZipCode ] = useState('');
  const [ countryCode, setCountryCode ] = useState('');

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
  const handleSecondEmail = (e) => setSecondEmail(e.target.value);
  const handleMobilePhone = (e) => setMobilePhone(e.target.value);
  const handleOrganization = (e) => setOrganization(e.target.value);
  const handleStreetAddress = (e) => setStreetAddress(e.target.value);
  const handleAptSuite = (e) => setAptSuite(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleStateProvince = (e) => setStateProvince(e.target.value);
  const handleZipCode = (e) => setZipCode(e.target.value);
  const handleCountryCode = (e) => setCountryCode(e.target.value);


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const tkn = await auth.getIdToken();
    if (tkn) {
      setSessionToken(tkn);
    }
  }

  const handleRegisterForm = async (e) => {
    await e.preventDefault();
    await setIsLoading(true);
    await validatePassword();


    const payload = {
      profile : {
        username,
        // password,
        firstName,
        lastName,
        email,
        secondEmail,
        mobilePhone,
        organization,

        streetAddress,
        aptSuite,
        city,
        stateProvince,
        zipCode,
        countryCode
      },
      credentials : {
        password: {
          value: password
        }
      }
    };

    axios
      .post("/.netlify/functions/create-user", JSON.stringify(payload))
      .then((res) => console.log('create-user response:  ', res));



    // await axios.post('/register', {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       profile : {
    //         username,
    //         // password,
    //         firstName,
    //         lastName,
    //         email,
    //         secondEmail,
    //         mobilePhone,
    //         employer,

    //         streetAddress,
    //         aptSuite,
    //         city,
    //         stateProvince,
    //         zipCode,
    //         countryCode
    //     },
    //     creds : {
    //       password: password
    //     }
    //   }
    //   })
    // }).then((user) => {
    //   okta.signIn({
    //     username: username,
    //     password: password
    //   })
    // }).then((res) => setSessionToken(res.sessionToken))
    // .catch((err) => console.log("Error in registration-form: ", err));

    setIsLoading(false);
  }

  const validatePassword = async () => {
    await setIsValidPassword(password.length > 8);
    await setIsMatchingPassword(password === passwordAgain);
  }

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
          <input placeholder="password" type="password" value={password} onChange={handlePassword} />
          <input placeholder="re-type password" type="password" value={passwordAgain} onChange={handlePasswordAgain} />
          <input placeholder="first name" value={firstName} onChange={handleFirstName} />
          <input placeholder="last name" value={lastName} onChange={handleLastName} />
          <input placeholder="email" value={email} onChange={handleEmail} />
          <input placeholder="second email" value={secondEmail} onChange={handleSecondEmail} />
          <input placeholder="mobilePhone" value={mobilePhone} onChange={handleMobilePhone} />
          <input placeholder="organization" value={organization} onChange={handleOrganization} />
        </div>
        <div className="shipping-form">
          <input placeholder="street address" value={streetAddress} onChange={handleStreetAddress} />
          <input placeholder="apt/suite" value={aptSuite} onChange={handleAptSuite} />
          <input placeholder="city" value={city} onChange={handleCity} />
          <input placeholder="state/province" value={stateProvince} onChange={handleStateProvince} />
          <input placeholder="zip code" value={zipCode} onChange={handleZipCode} />
          <input placeholder="country code" value={countryCode} onChange={handleCountryCode} />
        </div>
        <input id="register-submit" type="submit" value="Submit" />
      </form>
      <Link to="/login" />
      <Link to="/reset-password" />
    </div>
  );
}