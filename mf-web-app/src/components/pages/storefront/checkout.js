
import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import image from '../../../static/logo.svg';

export function Checkout() {
  const [ cart, setCart ] = useState(null);

  const stripeApiKey = process.env.STRIPE_PUBLIC_API_KEY;
  const stripeCurrency = 'USD';

  const successPayment = data => {
    alert('Payment Successful');
  };

  const errorPayment = data => {
    alert('Payment Error');
  };

  // const onToken = async (token, addresses) => {
  const onToken = (amount, description) => (token) => {
    axios.post('localhost:9000/.functions/stripe_payments',
    {
      description,
      source: token.id,
      currency: stripeCurrency,
      amount
    })
    .then(successPayment)
    .catch(errorPayment);

  };

  useEffect(() => {
    getCart()
      .then((res) => setCart(res.body.cart));

  }, []);

  return(
    <div className="checkout">
      <StripeCheckout
        stripeKey={stripeApiKey}
        token={onToken}
        amount={cart.total}
        billingAddress
        description={}
        image={image}
        locale="auto"
        name="merchforce"
        zipCode
        label="Pay with 💳"
        />
    </div>
  );
}
