import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';


export default function CardSection() {

  return(
    <div className="card-section">
      <div className="card-number">
        <CardNumberElement />
      </div>
      <div className="card-cvc">
        <CardCVCElement />
      </div>
      <div className="card-expiry">
        <CardExpiryElement />
      </div>
      <div className="card-postal-code">
        <CardPostalCodeElement />
      </div>
    </div>
  );
}
