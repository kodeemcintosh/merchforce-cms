
import React from 'react';
import { Logo } from './logo';
import { CartMenu } from './cart-menu';
import { AccountMenu } from './account-menu';

export const Header = () => {
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
}