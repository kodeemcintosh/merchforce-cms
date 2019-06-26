import { useMemo } from 'react';
// import { useStore } from '../../../../hooks/useStore';
// import { oktaConfig } from '../index';
import OktaAuth from '@okta/okta-auth-js';

class Okta {
  constructor() {
  }
  config = {
    // url: process.env.OKTA_DOMAIN,
    // issuer: `${process.env.OKTA_DOMAIN}/oauth2/default`,
    // redirect_uri: `${window.location.origin}/implicit/callback`,
    // client_id: process.env.OKTA_CLIENT_ID,
    // url: 'https://dev-612778.okta.com',
    issuer: 'https://dev-612778.okta.com/oauth2/default',
    redirect_uri: 'https://practical-panini-9e5a68.netlify.com/callback/login',
    // redirectUri: 'http://localhost:8080/implicit/callback',
    client_id: '0oarosrzbPITpCtHs356',
    tokenManager: {
      secure: true
      // storage: 'sessionStorage'
    },
    onAuthRequired: ({ history }) => history.push('/login'),
  }

  okta = new OktaAuth(this.config);
  // oktaAuth = useMemo(() => new OktaAuth(oktaConfig), [oktaConfig]);
    
    // useEffect(() => {})

 signIn = async (username, password) => {
    return await this.okta.signIn({
      username,
      password
    })
    .then((res) => JSON.parse(res));
  };
};

export default Okta;

const oktaConfig = new Okta().config;
export { oktaConfig };