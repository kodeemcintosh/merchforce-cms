
import React from 'react';
import { Link } from 'react-router';

export function AccountMenu({ first, last }) {
  let fullName = `${first} ${last}`;

  return(
    <div className="account-menu">
      <div className="customer-name">{fullName}</div>
      <span>line</span>
      <Link to="/account/profile" />
      <Link to="/account/contact" />
      <span>line</span>
      <Link to="/logout" />
    </div>
  );
}
