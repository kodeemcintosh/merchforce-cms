import React, { useState, useEffect } from 'react';
// import { Route, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import {  } from '@okta/okta-react';
import { oktaConfig } from './auth/Okta';
// import logo from './logo.svg';
// import useStore, { ContextStore } from './hooks/useStore';
import './App.css';
// import { Admin } from './components/pages/admin';
// import { Auth } from './components/pages/auth';
// import AuthCheck from './components/pages/auth';
import Login from './components/pages/auth/login/login';
import Register from './components/pages/auth/register/register';
import ResetPassword from './components/pages/auth/reset-password/reset-password-form';
// import Storefront from './components/pages/storefront';
import Welcome from './components/pages/welcome';
import { Featured, Account, Contact, Cart, HowItWorks, MerchList, MerchDetails } from './components/pages/storefront';
import { NotFound } from './components/shared/not-found';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

// axios.defaults.baseURL = process.env.MERCHFORCE_BASE;

function App() {
  // const [ store, setStore ] = useStore();

  return (
    <div className="App">
      {/* <ContextStore
        initialState={
          user={}

        }
        > */}
      <BrowserRouter>
        <Security {...oktaConfig}>
          <Switch>
          {/* <Route exact={true} to="/" component={Home} /> */}
          {/* <Route to="/" component={Storefront} /> */}

          <Route exact path="/" component={Welcome} />
          <Route path="/featured" component={Featured} />
          <Route path="/account" component={Account} />
          <Route path="/contact" component={Contact} />
          <Route path="/cart" component={Cart} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route exact path="/merch" component={MerchList} />
          <Route path="/merch/:merchId" component={MerchDetails} />
          {/* <Route to="/auth" render={Auth} /> */}

          <Route to="/login" component={Login} />
          <Route to="/register" component={Register} />
          <Route to="/reset-password/:username" component={ResetPassword} />


          {/* <Route to="/storefront" component={Storefront} /> */}
          {/* <Route to="/" component={Storefront} /> */}
          {/* <SecureRoute path={'/account'} component={Account} />
          <SecureRoute path={'/contact'} component={Contact} />
          <SecureRoute path={'/cart'} component={Cart} />
          <SecureRoute path={'/how-it-works'} component={HowItWorks} />
          <SecureRoute exact path={'/merch'} component={MerchList} />
          <SecureRoute path={'/merch/:merchId'} component={MerchDetails} /> */}


          {/* <SecureRoute to="/admin" component={Admin} /> */}
          <Route to="/implicit/callback" component={ImplicitCallback} />
          <Route path="404" component={NotFound} />
          <Route path="*" component={NotFound} />
          </Switch>
        </Security>
      </BrowserRouter>
      {/* </ContextStore> */}
    </div>
  );
}

export default App;

