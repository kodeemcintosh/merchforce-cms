import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Security } from '@okta/okta-react';
import * as serviceWorker from './serviceWorker';
import { oktaConfig } from './auth/Okta';

// export const oktaConfig = {
//   // url: process.env.OKTA_DOMAIN,
//   // issuer: `${process.env.OKTA_DOMAIN}/oauth2/default`,
//   // redirect_uri: `${window.location.origin}/implicit/callback`,
//   // client_id: process.env.OKTA_CLIENT_ID,
//   // url: 'https://dev-612778.okta.com',
//   issuer: 'https://dev-612778.okta.com/oauth2/default',
//   redirect_uri: 'https://practical-panini-9e5a68.netlify.com/callback/login',
//   // redirectUri: 'http://localhost:8080/implicit/callback',
//   client_id: '0oarosrzbPITpCtHs356',
//   tokenManager: {
//     secure: true
//     // storage: 'sessionStorage'
//   },
//   onAuthRequired: ({ history }) => history.push('/login'),
// }

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
