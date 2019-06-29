import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import RegistrationForm from './registration-form';

function Register({ auth, match }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(null);


  useEffect(() => checkAuth, []);

  const checkAuth = async () => {

    const nextIsAuthenticated = await auth.isAuthenticated();

    if (nextIsAuthenticated !== isAuthenticated) {

      setIsAuthenticated(nextIsAuthenticated);
    }
  }



  // render() {

    // if(!this.state.isAuthenticated) return auth.login("/login");
    if(isAuthenticated) match.history.push("/");

  // return this.state.isAuthenticated ? <Redirect to='/' /> : <RegistrationForm auth={this.props.auth} />;
  return <RegistrationForm auth={auth} />;
};

export default withRouter(withAuth(Register));
