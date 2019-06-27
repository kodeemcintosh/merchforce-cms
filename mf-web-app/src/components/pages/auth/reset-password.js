
import React, { useState } from 'react';
import OktaAuth from '@okta/okta-auth-js';

export default function ResetPassword({ match }) {
  // const [ newPassword, setNewPassword ] = useState();
  // const [ newPasswordAgain, setNewPasswordAgain ] = useState();
  // const [ hasMatchingPassword, setHasMatchingPassword ] = useState(true);
  // const [ isValidPassword, setIsValidPassword ] = useState(true);
  const [ username, setUsername ] = useState('');
  const [ verification, setVerification ] = useState('');

  const oktaAuth = new OktaAuth({ url: process.env.MERCHFORCE_BASE });

  const handleResetPasswordForm = () => {
    try {
      // if(newPassword !== newPasswordAgain) {
      //   setHasMatchingPassword(false);
      //   return;
      // }
      // if(!passwordValidation()) {
      //   setIsValidPassword(false);
      //   return;
      // }

      let username = match.params.username;
      oktaAuth.forgotPassword({
        username,
        factorType: verification
      })

      // TODO: hit up the reset password api
      console.log('handle-reset-password-form');
    } catch(err) {

    }
  }

  const handleUsername = (e) => setUsername(e.target.value);
  const handleVerification = (e) => setVerification(e.target.value);
  // const passwordValidation = () => {
  //   let regex = new RegExp(/^(?![0-9]{6,})[0-9a-zA-Z]{6,}$/);
  //   return newPassword.length < 6 || newPassword.match(regex);
  // }

  // const handleNewPassword = (e) => setNewPassword(e.target.value);
  // const handleNewPasswordAgain = (e) => setNewPasswordAgain(e.target.value);

  return(
    <div className="reset-password">
      <form onSubmit={handleResetPasswordForm}>
        {/* <label>Must contain at least 6 characters, 1 number, and 1 letter.</label>
        <input type="password" value={newPassword} onChange={handleNewPassword} />
        <input type="password" value={newPasswordAgain} onChange={handleNewPasswordAgain} />
        {!hasMatchingPassword ? <label>Passwords do not match!</label> : null}
        {!isValidPassword ? <label>Password doesn't meet the requirements!</label> : null} */}
        <input value={username} onChange={handleUsername} />
        <div onChange={handleVerification}>
          <input type="radio" name="verification-type" placeholder="Phone Call" value="CALL" />
          <input type="radio" name="verification-type" placeholder="Text Message"  value="SMS" />
          <input type="radio" name="verification-type" placeholder="Email" value="EMAIL" />
        </div>
        <button onClick={handleResetPasswordForm}>Submit!</button>
      </form>
    </div>
  );
}
