
import axios from 'axios';
import useSs from '../../hooks/useSs';
import { withAuth } from '@okta/okta-react';

const getCart = async ({ auth }) => {
  const [ storedCart, setStoredCart ] = useSs('cart', '');

  const accessToken = await auth.getAccessToken();

  if(storedCart === '') {
    let response = await axios.get(`/cart/${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
    }});

    setStoredCart(response.cart);
  }
  
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

  console.log('get cart api', response.cart)

  return [ storedCart ];
};


export default withAuth(getCart);