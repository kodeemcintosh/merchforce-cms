import React, { useState, useEffect } from 'react';
import logo from './../../../static/logo.svg';
import { withAuth } from '@okta/okta-react';

import { CartMenu } from './cart-menu';
import { AccountMenu } from './account-menu';
import axios from 'axios';


function Header({ auth }) {

  const logout = async () => auth.logout('/');


  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt={logo} />
      </div>
      <div className="cart-menu">
        <CartMenu />
      </div>
      <div className="account-menu">
        <AccountMenu logout={logout} />
      </div>
    </div>
  );
};

export default withAuth(Header);