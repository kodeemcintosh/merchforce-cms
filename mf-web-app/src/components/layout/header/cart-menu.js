
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import getCart from '../../../effects/api/get-cart';

export function CartMenu() {

  const [ cartSummary, setCartSummary ] = useState(() => {
    return {
        items: [
          { id: '123456', quantity: '2', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m0xuU6th1rTBcsSEO_buFnt_lr31NcjihYwHvzkGWDcqf_VEXQ'}
        ],
        total: 10.75
    };
  });
  const [ isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // getCart()
    //   .then((res) => setCartSummary(filterCartToSummary(res)));

  }, []);

  const filterCartToSummary = (cart) => {
    let total = 0;

    let items = cart.items.map((item) => {
      total += item.price.actual;

      return {
        id: item.id,
        quantity: item.quantity,
        img: item.img
      };
    });

    return {
      total,
      items
    }
  };

  return(
    <div>
      <button className="open-cart-summary" onClick={toggleMenu}></button>
      <div className={`cart-summary-menu ${isOpen ? 'visible' : ''}`}>
        <div className="cart-summary-title">Shopping Cart</div>
        <span>line</span>
        {cartSummary.items.map((item) => {
          return (
            <div className="cart-summary-item">
              <Link to={`/merch-details/${item.id}`}>
                {`${item.quantity} x `}<img className="cart-summary-item-image" src={item.img} alt={`${item.img} Unavailable`} />
              </Link>
            </div>
          );
        })}
        <span>line</span>
        <div className="cart-summary-menu-total">{cartSummary.total}</div>
      </div>
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