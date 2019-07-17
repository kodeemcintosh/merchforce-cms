import React, { useState, useEffect } from 'react';

import getCart from '../../../effects/api/get-cart';

export function Cart() {
  const [ cart, setCart ] = useState(null);

  useEffect(() => {
    // getCart()
    //   .then((res) => setCart(res.body.cart));

  }, []);

  return(
    <div className="cart">
      {cart}
    </div>
  );
}
