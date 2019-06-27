import { withAuth } from '@okta/okta-react';
import axios from 'axios';

export default withAuth(async function getMerchDetails({ auth, merchId }) {
  const accessToken = await auth.getAccessToken();

  return await axios.GET(`/merch/${merchId}`, {headers: {
    Authorization: `Bearer ${accessToken}`
  }});

  // return axios(method, process.env.MERCHFORCE_BASE + uri,
  //     { headers: {
  //       Authorization: `Bearer ${accessToken}`
  //   }}, payloadOrParams)

});