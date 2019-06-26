import { useMemo } from 'react';
// import { useStore } from '../../../../hooks/useStore';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(async function useAuth({ auth }) {
  const config = {
    // url: process.env.OKTA_DOMAIN,
    // redirectUri: 'https://' + process.env.MERCHFORCE_BASE + '/callback/login',
    // client_id: process.env.OKTA_CLIENT_ID,
    url: 'https://dev-612778.okta.com',
    redirectUri: 'https://practical-panini-9e5a68.netlify.com/callback/login',
    client_id: '0oarosrzbPITpCtHs356',
    tokenManager: {
      secure: true
      // storage: 'sessionStorage'
    },
    onAuthRequired: ({ history }) => history.push('/login'),
  };

  try {
    const oktaAuth = useMemo(() => new OktaAuth(config), [config]);
    
    // useEffect(() => {})

    const signIn = async (username, password) => {
      await oktaAuth.signIn({
        username,
        password
      })
      .then((res) => JSON.parse(res));
    };

    return {
      auth,
      config,
      signIn,
    }
  } catch(err) {

  }
});