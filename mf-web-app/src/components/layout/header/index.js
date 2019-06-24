import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { withAuth } from '@okta/okta-react';

import { Logo } from './logo';
import { CartMenu } from './cart-menu';
import { AccountMenu } from './account-menu';


export default withAuth(function Header({ auth }) {
// export const Header = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  const checkAuth = async () => {
    const authenticated = await auth.isAuthenticated();

    if(authenticated !== isAuthenticated) {
      setIsAuthenticated(authenticated);
    }
  }

  useEffect(() => {
    checkAuth();
  })

  if(isAuthenticated === null) {
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="account-menu">
        <Link to="/login">login</Link>
        <Link to="/register">signup</Link>
      </div>
    </div>
  }

  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="cart-menu">
        <CartMenu />
      </div>
      <div className="account-menu">
        <AccountMenu />
      </div>
    </div>
  );
});