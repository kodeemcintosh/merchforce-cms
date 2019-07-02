
import { withAuth } from '@okta/okta-react';

const getUser = async ({ auth }) => {
  const user = await auth.getUser();
  console.log('/userinfo enpoint gives us:  ', user);

  return user;
};

export default withAuth(getUser);