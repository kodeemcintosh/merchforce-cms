
import axios from 'axios';
import useSs from '../../hooks/useSs';
import { withAuth } from '@okta/okta-react';

const getCart = async ({ auth }) => {
  const [ storedCart, setStoredCart ] = useSs('cart', '');

  const accessToken = await auth.getAccessToken();

  let response = await axios.get(`/cart/${user.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
  }});

  setStoredCart(response.cart);

  return response.cart;
};

export default withAuth(getCart);