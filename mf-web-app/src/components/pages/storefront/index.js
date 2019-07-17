import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router';

import Header from '../../layout/header';
import { Footer } from '../../layout/footer';
import { withAuth, SecureRoute } from '@okta/okta-react';

import Account from './account';
import Featured from './featured';
import MerchList from './merch-list';
import MerchDetails from './merch-details';
import { Cart } from './cart';
import { Checkout } from './checkout';
import Contact from './contact';
import { HowItWorks } from './how-it-works';

import getUser from '../../../effects/api/get-user';


function Storefront({ auth, match }) {
  // const [ account, setAccount ] = useState(null);
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    // getUser()
    //   .then((res) => setUser(res.user));

  }, []);



    return(
      <div className="storefront">
          <Header />
          Storefront
          <div className="storefront-router">
            <Switch>
              <Route path="/" component={Featured} />
              <Route path={`${match.url}/`} component={Featured} />
              <Route path={`${match.url}/account`} component={Account} />
              <Route path={`${match.url}/contact`} component={Contact} />
              <Route path={`${match.url}/cart`} render={() => <Cart />} />
              <SecureRoute path={`${match.url}/checkout`} render={() => <Checkout />} />
              <Route path={`${match.url}/how-it-works`} component={HowItWorks} />
              <Route exact path={`${match.url}/merch`} component={MerchList} />
              <Route path={`${match.url}/merch/:merchId`} component={MerchDetails} />
            </Switch>
          </div>
        <Footer />
      </div>
    );
};

export default withRouter(withAuth(Storefront));