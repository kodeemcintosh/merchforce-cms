
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  // CardElement,
  CardNumberElement,
  CardExpiryElemnet,
  CardCVCElement,
  injectStripe } from 'react-stripe-elements';
import getCart from '../../../../effects/api/get-cart';

import image from '../../../../static/logo.svg';

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

  const handleAddressLine1 = (e) => setAddressLine1(e.target.value);
  const handleAddressLine2 = (e) => setAddressLine2(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value);
  const handleStateProvince = (e) => setStateProvince(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  useEffect(() => {
    // getCart()
    //   .then((res) => setCart(res.body.cart));

  }, []);

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
          <div className="address-line1">
            <input onChange={handleAddressLine1}></input>
          </div>
          <div className="address-line2">
            <input onChange={handleAddressLine2}></input>
          </div>
          <div className="city">
            <input onChange={handleCity}></input>
          </div>
          <div className="postal-code">
            <input onChange={handlePostalCode}></input>
          </div>
          <div className="state-province">
            <input onChange={handleStateProvince}></input>
          </div>
          <div className="country">
            <input onChange={handleCountry}></input>
          </div>
        </div>
        {/* <CardElement
          onChange={handleChange}
          {...createOptions()}
          /> */}
        {errorMessage ? (<div className="error">{errorMessage}</div>) : null}
        <button onClick={handleSubmit}>Pay ${Math.floor(cart.total, 2)}</button>
      </form>
    </div>
  );
}

export default injectStripe(CheckoutForm);