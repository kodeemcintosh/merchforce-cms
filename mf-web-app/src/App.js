import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import logo from './logo.svg';
import { ContextStore, useStore } from './hooks/useStore';
import './App.css';
import { Login, Register, ResetPassword, Admin } from './components/pages/auth';
import { NotFound } from './components/shared/not-found';
import { Storefront } from './components/pages/storefront';

function App() {
  const [ isAuthorized, setIsAuthorized ] = useState(false);
  const [ store, setStore ] = useStore();

  if(!isAuthorized) {
    return (
      <div className="App">
        <div className="auth-router">
          <Switch>
            <Route exact to="/login" render={() => <Login authorize={setIsAuthorized} />} />
            <Route exact to="/register" component={Register} />
            <Route exact to="/reset-password/:userId" component={ResetPassword} />
          </Switch>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <ContextStore
        // initialState={
          // user={}

        // }
        >
        <div className="app-router">
          <Switch>
            <Route to="/" component={Storefront} />
            <Route to="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ContextStore>
    </div>
  );
}

export default App;
