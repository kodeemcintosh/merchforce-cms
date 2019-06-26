
import React from 'react';
import MerchForceLogo from './../../../static/merchforcelogo.png';

export const Logo = ({ CustomerLogo }) => {

  return(
    <div className="logo">
      <CustomerLogo />
      Powered by 
      <MerchForceLogo />
    </div>
  )
}