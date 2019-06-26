import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {

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
      <Link to="/login">signin</Link>
      <Link to="/reset-password">reset password</Link>
    </div>
  );
}
