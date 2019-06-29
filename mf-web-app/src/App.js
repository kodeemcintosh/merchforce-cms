import React, { useState, useEffect } from 'react';
import { oktaConfig } from './auth/Okta';
// import logo from './logo.svg';
import { Route, Switch } from 'react-router';
// import useStore, { ContextStore } from './hooks/useStore';
import './App.css';
// import { Admin } from './components/pages/admin';
// import { Auth } from './components/pages/auth';
// import AuthCheck from './components/pages/auth';
import Login from './components/pages/auth/login/login';
import Register from './components/pages/auth/register/register';
import ResetPassword from './components/pages/auth/reset-password/reset-password';
import Storefront from './components/pages/storefront';
import Welcome from './components/pages/welcome';
// import { Featured, Account, Contact, Cart, HowItWorks, MerchList, MerchDetails } from './components/pages/storefront';
import { NotFound } from './components/shared/not-found';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';


// axios.defaults.baseURL = process.env.MERCHFORCE_BASE;

function App() {
  // const [ store, setStore ] = useStore();

  console.log('SECURE-ROUTE---------------------------------', SecureRoute);

  return (
    <div className="App">
      {/* <ContextStore
        initialState={
          user={}

        }
        > */}
      {/* <Route exact={true} to="/" component={Home} /> */}
      {/* <Route to="/" component={Storefront} /> */}

      {/* <Welcome path="/" />

      <Login path="/login" />
      <Register path="/register" />
      <ResetPassword path="/reset-password" />

      <Featured path="/featured" />
      <Account path="/account">
      </Account>
      <Contact path="/contact" />
      <Cart path="/cart" />
      <HowItWorks path="/how-it-works" />
      <MerchList path="/merch" />
      <MerchDetails path="/merch/:merchId" /> */}
      <Switch>
        {/* <Route exact path="/" component={Welcome} /> */}
        <SecureRoute exact path="/" component={Storefront} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/reset-password/:username" component={ResetPassword} />

        {/* <Route path="/featured" component={Featured} />
        <Route path="/account" component={Account} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route exact path="/merch" component={MerchList} />
        <Route path="/merch/:merchId" component={MerchDetails} /> */}


        {/* <SecureRoute to="/admin" component={Admin} /> */}
        {/* <ImplicitCallback path="/implicit/callback" />
        <NotFound path="*" /> */}
        <Route to="/implicit/callback" component={ImplicitCallback} />
        <Route path="404" component={NotFound} />
        <Route path="*" component={NotFound} />
      </Switch>
      {/* </ContextStore> */}
    </div>
  );
}

export default App;

