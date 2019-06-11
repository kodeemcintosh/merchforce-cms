
import React from 'react';
import { Link } from 'react-router';

export const Sidenav = ({ selectedLink, handleLink }) => {

  return (
    <div className="sidenav">
      <span className={selectedLink === "details" ? "selected" : ""}><Link id="details" onClick={(e) => handleLink(e)} to="/account/details" /><span>
      <span className={selectedLink === "purchase-history" ? "selected" : ""}><Link id="purchase-history" onClick={(e) => handleLink(e)} to="/account/purchase-history" /></span>
      <span className={selectedLink === "cart" ? "selected" : ""}><Link id="cart" onClick={(e) => handleLink(e)} to="/account/cart" /></span>
    </div>
  );
}