
import React, { useState, useEffect } from 'react';
// import useStore from './../../../hooks/useStore';
import { Link } from 'react-router-dom';

export function CartMenu({ cart }) {

  // const [ store, setStore ] = useStore();

  const [ isOpen, setIsOpen ] = useState(false);

  // const cart = store.cart;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect();


  return(
    <div className="cart-summary-menu">
      <div className="cart-summary-title" onClick={toggleMenu}>Shopping Icon</div>
      <span>line</span>
      {cart.items.map((item) => {
        return (
          <div className="cart-summary-item">
            <Link to={`/merch-details/${item.id}`}>
              {`${item.quantity} x `}<img className="cart-summary-item-image" src={item.img} alt={`${item.img} Unavailable`} />
            </Link>
          </div>
        );
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