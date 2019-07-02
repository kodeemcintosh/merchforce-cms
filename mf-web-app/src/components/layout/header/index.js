import React, { useState, useEffect } from 'react';
import logo from './../../../static/logo.svg';
import { withAuth } from '@okta/okta-react';

import { CartMenu } from './cart-menu';
import { AccountMenu } from './account-menu';
import axios from 'axios';


export default withAuth(function Header({ auth }) {
  const [ cartSummary, setCartSummary ] = useState(() => {
    return {
      items: [
        { id: '123456', quantity: '2', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m0xuU6th1rTBcsSEO_buFnt_lr31NcjihYwHvzkGWDcqf_VEXQ'}
      ],
      total: 10.75
    }
  });

  const logout = async () => auth.logout('/');


  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt={logo} />
      </div>
      <div className="cart-menu">
        <CartMenu cartSummary={cartSummary} />
      </div>
      <div className="account-menu">
        <AccountMenu logout={logout} />
      </div>
    </div>
  );
});