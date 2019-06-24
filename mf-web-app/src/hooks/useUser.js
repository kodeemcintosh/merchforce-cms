import React, { useState, useEffect } from 'react';
import { withAuth } from '@okta/okta-react';
import { useStore } from './useStore';
import axios from 'axios';

export default withAuth(function useUser({ auth }) {
  const [ store, setStore ] = useStore();

  if(store.user) {
    return;
  }

  let user = await axios.get("/account", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  await setStore({ user });

  return user;
  // return {
  //   user,
  //   setUser
  // }
});