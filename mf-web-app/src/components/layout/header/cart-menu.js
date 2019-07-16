
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CartMenu({ cartSummary }) {

  const [ cartSummary, setCartSummary ] = useState({});
  const [ isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    getCart()
      .then((res) => setCartSummary(filterCartToSummary(res)));

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
    <div className="cart-summary-menu">
      <div className="cart-summary-title" onClick={toggleMenu}>Shopping Icon</div>
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