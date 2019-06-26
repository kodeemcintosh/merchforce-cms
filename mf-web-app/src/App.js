import React from 'react';
import { Route, Switch } from 'react-router';
// import logo from './logo.svg';
// import useStore, { ContextStore } from './hooks/useStore';
import './App.css';
// import { Admin } from './components/pages/admin';
import { Login, Register, ResetPassword } from './components/pages/auth';
import { NotFound } from './components/shared/not-found';
import { Storefront } from './components/pages/storefront';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

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
            <Route exact to="/login" render={Login} />
            <Route exact to="/register" component={Register} /> */}
            <Route exact to="/reset-password/:username" component={ResetPassword} />

            <SecureRoute to="/" component={Storefront} />
            {/* <SecureRoute to="/admin" component={Admin} /> */}
            <SecureRoute to="/implicit/callback" component={ImplicitCallback} />
            <Route component={NotFound} />
          </Switch>
        </div>
      {/* </ContextStore> */}
    </div>
  );
}

export default App;
