
import React, { useState, useEffect } from 'react';
import image from '../../../static/logo.svg';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CheckoutForm from './checkout-form';

export function Checkout() {
  const [ cart, setCart ] = useState(null);

  // uncomment if StripeProvider doesn't work in /src/index.js
  const stripeApiKey = process.env.STRIPE_PUBLIC_KEY || 'pk_test_xBgSuBEsbjJ3xaqXjN9VgEiq00R3nH61N2';


  useEffect(() => {
    getCart()
      .then((res) => setCart(res.body.cart));

  }, []);


  return(
    <StripeProvider apiKey={stripeApiKey}>
      <div className="checkout">
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
}
