import React from 'react';
import { Redirect } from 'react-router';
import { withAuth } from '@okta/okta-react';

import ResetPasswordForm from './reset-password';

const ResetPassword = ({ auth }) => {
  return <ResetPasswordForm auth={auth} />
};

export default withAuth(ResetPassword);
