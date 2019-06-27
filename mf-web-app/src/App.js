import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
// import logo from './logo.svg';
// import useStore, { ContextStore } from './hooks/useStore';
import './App.css';
// import { Admin } from './components/pages/admin';
// import { Auth } from './components/pages/auth';
import Login from './components/pages/auth/login/login';
import Register from './components/pages/auth/register/register';
import ResetPassword from './components/pages/auth/reset-password';
import Storefront from './components/pages/storefront';
import { NotFound } from './components/shared/not-found';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

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
        <div className="router">
          <Switch>
            <Route exact to="/" component={Storefront} />
            {/* <Route to="/auth" render={Auth} /> */}

            <Route exact to="/login" render={Login} />
            <Route exact to="/register" component={Register} />
            <Route exact to="/reset-password/:username" component={ResetPassword} />


            {/* <Route to="/" component={Storefront} /> */}
            {/* <SecureRoute path={'/account'} component={Account} />
            <SecureRoute path={'/contact'} component={Contact} />
            <SecureRoute path={'/cart'} component={Cart} />
            <SecureRoute path={'/how-it-works'} component={HowItWorks} />
            <SecureRoute exact path={'/merch'} component={MerchList} />
            <SecureRoute path={'/merch/:merchId'} component={MerchDetails} /> */}


            {/* <SecureRoute to="/admin" component={Admin} /> */}
            <Route to="/implicit/callback" component={ImplicitCallback} />
            <Route component={NotFound} />
          </Switch>
        </div>
      {/* </ContextStore> */}
    </div>
  );
}

export default App;
