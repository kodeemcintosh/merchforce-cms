
import React from 'react';
import { Link } from 'react-router';

export function Register() {

  const handleRegisterForm = () => {
    console.log('handle-register-form');
  }

  return(
    <div className="register">
      <form onSubmit={handleRegisterForm}>
      <input />
      <input />
      <input />
      <input />
      </form>
      <Link to="/login" />
      <Link to="/reset-password" />
    </div>
  );
}
