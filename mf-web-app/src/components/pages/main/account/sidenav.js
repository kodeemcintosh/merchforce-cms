
import React from 'react';
import { Link } from 'react-router';

export const Sidenav = () => {

  return (
    <div className="sidenav">
      <Link id="overview" className="overview" to="/account/overview">Overview</Link>
      <Link id="profile" className="profile" to="/account/profile">Profile</Link>
      <Link id="edit-profile" className="edit-profile" to="/account/edit-profile">Edit Profile</Link>
      <Link id="cart" className="cart" to="/account/cart">Cart</Link>
      <Link id="purchase-history" className="purchase-history" to="/account/purchase-history">Purchase History</Link>
      <Link id="shipping" className="shipping" to="/account/shipping">Shipping</Link>
      <Link id="change-password" className="change-password" to="/account/change-password">Change Password</Link>
      <Link id="receipts" className="receipts" to="/account/receipts">Receipts</Link>
    </div>
  );
}