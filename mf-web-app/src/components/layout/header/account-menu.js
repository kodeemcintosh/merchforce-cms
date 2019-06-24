import React, { useState } from 'react';
import { NavLink } from 'react-router';

export function AccountMenu({ auth, first, last }) {
  let fullName = `${first} ${last}`;

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const logout = async () => auth.logout();

  return(
    <div className="account-menu">
      <div>profile icon</div>
      <popover>
        <div className="customer-name">{fullName}</div>
        <span>line</span>
        <NavLink to="/account/profile" />
        <NavLink to="/account/contact" />
        <span>line</span>
        <div className="logout-button" onClick={logout}>logout</div>
      </popover>
    </div>
  );
}
