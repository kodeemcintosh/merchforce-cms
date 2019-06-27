import { useMemo } from 'react';
// import { oktaConfig } from '../index';
import OktaAuth from '@okta/okta-auth-js';

const oktaConfig = {
  url: 'https://dev-612778.okta.com',
  // url: process.env.OKTA_DOMAIN,

  issuer: 'https://dev-612778.okta.com/oauth2/default',
  // issuer: `${process.env.OKTA_DOMAIN}/oauth2/default`,

  redirect_uri: 'http://localhost:3000/implicit/callback',
  // redirect_uri: 'https://practical-panini-9e5a68.netlify.com/callback',
  // redirect_uri: `${process.env.MERCHFORCE_BASE}/callback`,
  // redirectUri: 'http://localhost:8080/implicit/callback',

  client_id: '0oarosrzbPITpCtHs356',
  // client_id: process.env.OKTA_CLIENT_ID,

  tokenManager: {
    secure: true
    // storage: 'sessionStorage'
  },
  onAuthRequired: ({ history }) => history.push('/login'),
}
export { oktaConfig };


// okta factory function
export function Okta() {
  return new OktaAuth(oktaConfig);
};

export default Okta;

// const { config } = Okta();
// export { config };
// const oktaConfig = new Okta().config;
// export { oktaConfig };