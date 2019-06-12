
import React, { useEffect } from 'react';
import { useStore } from './../../../hooks/useStore';
import { Link } from 'react-router';

export function CartMenu({ }) {

  const [ store, setStore ] = useStore();

  const cart = store.cart;


  return(
    <div className="cart-summary-menu">
      <div className="cart-summary-title">Shopping Cart</div>
      <span>line</span>
      {cart.items.map((item) => {
        <div className="cart-summary-item">
          {`${item.quantity} x `}<img className="cart-summary-item-image" src={item.img} />
        </div>
      })}
      <span>line</span>
      <div className="cart-summary-menu-total">{cart.total}</div>
    </div>
  );
}

// cart: {
//   items: [
//     {
//       color: 'Heather Gray',
//       quantity: 2,
//       img: '../../../public/item1234234.png',
//     }
//   ],
//   total: 99.98
// }