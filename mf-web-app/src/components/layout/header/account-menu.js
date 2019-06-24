import React, { useState } from 'react';
import { Link } from 'react-router';

export function AccountMenu({ first, last }) {
  let fullName = `${first} ${last}`;

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return(
    <div className="account-menu">
      <div>profile icon</div>
      <popover>
        <div className="customer-name">{fullName}</div>
        <span>line</span>
        <Link to="/account/profile" />
        <Link to="/account/contact" />
        <span>line</span>
        <Link to="/logout" />
      </popover>
    </div>
  );
}
