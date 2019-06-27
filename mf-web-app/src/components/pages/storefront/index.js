import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { withAuth, SecureRoute } from '@okta/okta-react';
import Header from '../../layout/header';
import { Footer } from '../../layout/footer';
import Account from './account';
import { Cart } from './cart'
import { Contact } from './contact';
import Featured from './featured';
import { HowItWorks } from './how-it-works';
import MerchList from './merch-list';
import MerchDetails from './merch-details';
import axios from 'axios';
// import { withAuth } from '@okta/okta-react';

export default withAuth(function Storefront({ auth, match }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(null);

  useEffect(() => {
    const isAuth =  auth.isAuthenticated();

    if(isAuth !== isAuthenticated) {
      setIsAuthenticated(isAuth);
    }
  }, [auth]);

  // if(isAuthenticated === null) return null;

  if(!isAuthenticated) {
    auth.login("/");
  }

  return(
    <div className="storefront">
        Storefront
        <div className="storefront-router">
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/featured" />} />
            <Route path="/featured" component={Featured} />
            <Route path="/account" component={Account} />
            <Route path="/contact" component={Contact} />
            <Route path="/cart" component={Cart} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route exact path="/merch" component={MerchList} />
            <Route path="/merch/:merchId" component={MerchDetails} />
            <Route component={NotFound} /> */}












            {/* <SecureRoute exact path={`${match.url}`} render={() => <Redirect to="/featured" />} /> */}
            {/* <SecureRoute path={`${match.url}/featured`} component={Featured} /> */}
            <SecureRoute path={`${match.url}/`} component={Featured} />
            <SecureRoute path={`${match.url}/account`} component={Account} />
            <SecureRoute path={`${match.url}/contact`} component={Contact} />
            <SecureRoute path={`${match.url}/cart`} component={Cart} />
            <SecureRoute path={`${match.url}/how-it-works`} component={HowItWorks} />
            <SecureRoute exact path={`${match.url}/merch`} component={MerchList} />
            <SecureRoute path={`${match.url}/merch/:merchId`} component={MerchDetails} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      <Footer />
    </div>
  );
// });
});
