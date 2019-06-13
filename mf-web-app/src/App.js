import React, { useState } from 'react';
import { Routes, Switch } from 'react-router';
import logo from './logo.svg';
import { ContextStore, useStore } from './hooks/useStore';
import './App.css';
import { Main, Login, Register, ResetPassword, Admin } from './components/pages';

function App() {
  const [ isAuthorized, setIsAuthorized ] = useState(false);
  const [ store, setStore ] = useStore();

  if(!isAuthorized) {
    return (
      <div className="App">
        <div className="auth-router">
          <Switch>
            <Route exact to="/login" render={() => <Login authorize={setIsAuthorized} />} />
            <Route to="/register" component={Register} />
            <Route to="/reset-password/:userId" component={ResetPassword} />
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
              <Route exact to="/" component={Main} />
              <Route exact to="/admin" component={Main} />
            </Switch>
          </div>

      </ContextStore>
    </div>
  );
}

export default App;
