import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StripeProvider } from 'react-stripe-elements';
import { Security } from '@okta/okta-react';
import { oktaConfig } from './auth/Okta';

// const stripeApiKey = process.env.STRIPE_PUBLIC_KEY || 'pk_test_xBgSuBEsbjJ3xaqXjN9VgEiq00R3nH61N2';

ReactDOM.render(
  <BrowserRouter>
    <Security {...oktaConfig}>
      {/* <StripeProvider apiKey={stripeApiKey}> */}
        <App />
      {/* </StripeProvider> */}
    </Security>
  </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
