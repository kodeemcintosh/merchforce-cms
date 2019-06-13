
import React, { useState } from 'react';

export function ResetPassword() {
  const [ newPassword, setNewPassword ] = useState();
  const [ newPasswordAgain, setNewPasswordAgain ] = useState();
  const [ hasMatchingPassword, setHasMatchingPassword ] = useState(true);
  const [ isValidPassword, setIsValidPassword ] = useState(true);

  const handleResetPasswordForm = () => {
    if(newPassword !== newPasswordAgain) {
      setHasMatchingPassword(false);
      return;
    }
    if(!passwordValidation()) {
      setIsValidPassword(false);
      return;
    }

    let userId = this.props.match.params.userId;
    // TODO: hit up the reset password api
    console.log('handle-reset-password-form');
  }
  const passwordValidation = () => {
    let regex = new RegExp(/^(?![0-9]{6,})[0-9a-zA-Z]{6,}$/);
    return newPassword.length < 6 || newPassword.match(regex);
  }

  const handleNewPassword = (e) => setNewPassword(e.target.value);
  const handleNewPasswordAgain = (e) => setNewPasswordAgain(e.target.value);

  return(
    <div className="reset-password">
      <form onSubmit={handleResetPasswordForm}>
        <label>Must contain at least 6 characters, 1 number, and 1 letter.</label>
        <input type="password" value={newPassword} onChange={handleNewPassword} />
        <input type="password" value={newPasswordAgain} onChange={handleNewPasswordAgain} />
        {!hasMatchingPassword ? <label>Passwords do not match!</label> : null}
        {!isValidPassword ? <label>Password doesn't meet the requirements!</label> : null}
        <button onClick={handleResetPasswordForm}>Submit!</button>
      </form>
    </div>
  );
}
