import React from 'react';
import { Switch, Route } from 'react-router';
import { Sidenav } from './sidenav';
import { Overview } from './overview';
import { Profile } from './profile';
import { PurchaseHistory } from './purchase-history';
import { ChangePassword } from './change-password';
import { Receipts } from './receipts';

export function Account() {


  const handleLink = () => {

  }

  return (
    <div className="account">
      <Sidenav />
      <Switch>
        <Route to="/account/overview" component={Overview}></Route>
        <Route to="/account/profile" component={Profile}></Route>
        <Route to="/account/edit-profile" component={EditProfile}></Route>
        <Route to="/account/shipping" component={ShippingDetails}></Route>
        <Route to="/account/purchase-history" component={PurchaseHistory}></Route>
        <Route to="/account/change-password" component={ChangePassword}></Route>
        <Route to="/account/receipts" component={Receipts}></Route>
      </Switch>
    </div>
  );
}
