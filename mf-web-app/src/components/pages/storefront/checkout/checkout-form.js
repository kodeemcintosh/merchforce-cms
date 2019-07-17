
import React, { useState, useEffect } from 'react';
import image from '../../../static/logo.svg';
import {
  // CardElement,
  CardNumberElement,
  CardExpiryElemnet,
  CardCVCElement,
  injectStripe } from 'react-stripe-elements';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

function CheckoutForm({ stripe, handleResult }) {
  const [ cart, setCart ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ name, setName ] = useState('');
  const [ addressLine1, setAddressLine1 ] = useState('');
  const [ addressLine2, setAddressLine2 ] = useState('');
  const [ city, setCity ] = useState('');
  const [ postalCode, setPostalCode ] = useState('');
  const [ stateProvince, setStateProvince ] = useState('');
  const [ country, setCountry ] = useState('');

  const stripeCurrency = process.env.STRIPE_CURRENCY || 'USD';


  useEffect(() => {
    getCart()
      .then((res) => setCart(res.body.cart));

  }, []);

  const handleChange = (e) => setError(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { token } = await stripe.createToken('card', {
        name,
        // email,
        addressLine1,
        addressLine2,
        city,
        postalCode,
        stateProvince,
        country
      });

      const payload = await JSON.stringify({
        token,
        charge: {
          amount: cart.total,
          currency: stripeCurrency,
          // email,
          // number
        }
      })

      await axios.POST("/.netlify/functions/stripe", payload);

    } catch (err) {
      console.warn('Stripe.js checkout error', err);
    }
  }



  return(
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <div className="address-section">
          <input></input>
        </div>
        {/* <CardElement
          onChange={handleChange}
          {...createOptions()}
          /> */}
        {errorMessage ? (<div className="error">{errorMessage}</div>) : null}
        <button onClick={handleSubmit}>Pay</button>
      </form>
    </div>
  );
}

export default injectStripe(CheckoutForm);