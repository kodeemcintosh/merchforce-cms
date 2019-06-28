import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import RegistrationForm from './registration-form';

export default withAuth(class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: null
    }
  }

  async componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    let { auth } = { ...this.props };
    let { isAuthenticated } = { ...this.state };

    const nextIsAuthenticated = await auth.isAuthenticated();

    if (nextIsAuthenticated !== isAuthenticated) {

      this.setState({ isAuthenticated: nextIsAuthenticated });
    }
  }

  render() {
    return this.state.isAuthenticated ? <Redirect to='/' /> : <RegistrationForm auth={this.props.auth} />;
  }
});
