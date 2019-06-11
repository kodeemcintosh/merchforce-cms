import React from 'react';
import { Routes, Switch } from 'react-router';
import logo from './logo.svg';
import { ContextStore, useStore } from './hooks/useStore';
import './App.css';
import { Featured, Account, MerchList, MerchDetails, Login, Register, PasswordReset } from './components/pages';

function App() {
  return (
    <div className="App">
      <ContextStore
        // initialState={
          // user={}

        // }
        >
          <Switch>
            <Route to="/" component={Featured} />
            <Route to="/account" component={Account} />
            <Route to="/login" component={Login} />
            <Route to="/register" component={Register} />
            <Route to="/merch-list" component={MerchList} />
            <Route to="/merch-details" component={MerchDetails} />

            <Route to="/" component={Admin} />
            <Route to="/" component={} />
            <Route to="/" component={} />
          </Switch>

      </ContextStore>
    </div>
  );
}

export default App;
