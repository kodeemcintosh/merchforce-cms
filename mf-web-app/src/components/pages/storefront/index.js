import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Header from '../../layout/header';
import { Footer } from '../../layout/footer';
import Account from './account';
import { Cart } from './cart'
import { Contact } from './contact';
import Featured from './featured';
import { HowItWorks } from './how-it-works';
import MerchList from './merch-list';
import MerchDetails from './merch-details';
// import { withAuth } from '@okta/okta-react';

export const Storefront = ({ match }) => {
// export default withAuth(function Storefront({ match, auth }) {
  // const checkAuth = async () => {
  //   const isAuthenticated = await auth.isAuthenticated();
  //   if (isAuthenticated) {
  //     setIsAuthenticated(isAuthenticated);
  //   }
  // }

  return(
    <div className="storefront">
      <Header />
        <div className="app-router">
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












            <Route exact path={`${match.url}`} render={() => <Redirect to="/featured" />} />
            <Route path={`${match.url}/featured`} component={Featured} />
            <Route path={`${match.url}/account`} component={Account} />
            <Route path={`${match.url}/contact`} component={Contact} />
            <Route path={`${match.url}/cart`} component={Cart} />
            <Route path={`${match.url}/how-it-works`} component={HowItWorks} />
            <Route exact path={`${match.url}/merch`} component={MerchList} />
            <Route path={`${match.url}/merch/:merchId`} component={MerchDetails} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      <Footer />
    </div>
  );
// });
};
