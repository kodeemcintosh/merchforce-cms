import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function AccountMenu({ user }) {

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);


  return(
    <div className="account-menu">
      <div onClick={toggleMenu}>profile icon</div>
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
