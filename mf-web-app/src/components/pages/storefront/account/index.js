import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router';
import { Overview } from './overview';
import { Profile } from './profile';
import { OrderDetails } from './order-details';
import { Orders } from './orders';
import { ChangePassword } from './change-password';
import { Receipts } from './receipts';

export function Account() {

  return (
    <div className="account">
      <Sidenav />
      <Switch>
        <Route exact to="/account" component={Overview}></Route>
        <Route to="/account/profile" component={Profile}></Route>
        <Route to="/account/orders" component={Orders}></Route>
        <Route to="/account/orders/:orderId" component={OrderDetails}></Route>
        <Route to="/account/change-password" component={ChangePassword}></Route>
        <Route to="/account/receipts" component={Receipts}></Route>
      </Switch>
    </div>
  );
}

export const Sidenav = () => {

  return (
    <div className="sidenav">
      <NavLink id="overview" className="overview" activeClassName="active" to="/account">Overview</NavLink>
      <NavLink id="profile" className="profile" activeClassName="active" to="/account/profile">Profile</NavLink>
      <NavLink id="cart" className="cart" activeClassName="active" to="/account/cart">Cart</NavLink>
      <NavLink id="orders" className="orders" activeClassName="active" to="/account/orders">Previous Orders</NavLink>
      <NavLink id="order-details" className="order-details" activeClassName="active" to="/account/orders/">Previous Orders</NavLink>
      <NavLink id="shipping" className="shipping" activeClassName="active" to="/account/shipping">Shipping</NavLink>
      <NavLink id="change-password" className="change-password" activeClassName="active" to="/account/change-password">Change Password</NavLink>
      <NavLink id="receipts" className="receipts" activeClassName="active" to="/account/receipts">Receipts</NavLink>
    </div>
  );
}