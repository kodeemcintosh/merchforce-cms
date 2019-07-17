import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Okta from '../../../auth/Okta';

// export function AccountMenu({ user }) {
export function AccountMenu() {
  let user = {
    fullName: "Kodee McIntosh"
  }

  let okta = Okta();

  // const [ isOpen, setIsOpen ] = useState(false);

  // const toggleMenu = () => setIsOpen(!isOpen);

  // const logout = async () => auth.logout();
  const logout = () => okta.signOut();

  return(
    <div className="account-menu">
      {/* <div onClick={toggleMenu}>profile icon</div> */}
        <div className="customer-name">{user.fullName}</div>
        <span>line</span>
        <NavLink to="/account/profile" />
        <NavLink to="/account/contact" />
        <span>line</span>
        <button className="logout-button" onClick={logout}>logout</button>
    </div>
  );
}
