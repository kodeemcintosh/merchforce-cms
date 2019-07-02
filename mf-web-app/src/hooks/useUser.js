import { useState, useEffect } from 'react';
import { withAuth } from '@okta/okta-react';
// import useStore from './useStore';
import axios from 'axios';

export default withAuth(async function useUser({ auth }) {
  // const [ store, setStore ] = useStore();
  const [ state, setState ] = useState(null);

  useEffect();
  // if(store.user) {
  //   return;
  // }
  let accessToken = auth.getAccessToken();

  await axios.GET(`/accounts/${auth.userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })
  .then((res) => setState(res.user))


  // await setStore({ user });

  return [state];
  // return {
  //   user,
  //   setUser
  // }
});