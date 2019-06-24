import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import config from './app.config';
import { Security } from '@okta/okta-react';
import * as serviceWorker from './serviceWorker';

const oktaConfig = {
  issuer: `${process.env.OKTA_DOMAIN}/oauth2/default`,
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: process.env.OKTA_CLIENT_ID,
  onAuthRequired: onAuthRequired,
}

function onAuthRequired({ history }) {
  history.push('/login');
}

ReactDOM.render(
  <BrowserRouter>
    <Security {...oktaConfig}>
      <App />
    </Security>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
