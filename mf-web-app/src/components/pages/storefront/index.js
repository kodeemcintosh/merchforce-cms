import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';

import { withAuth, SecureRoute } from '@okta/okta-react';
import Header from '../../layout/header';
import { Footer } from '../../layout/footer';

import Account from './account';
import Featured from './featured';
import MerchList from './merch-list';
import MerchDetails from './merch-details';
import { Cart } from './cart';
import { Contact } from './contact';
import { HowItWorks } from './how-it-works';




// import Account from './account';
// import Featured from './featured';
// import MerchList from './merch-list';
// import MerchDetails from './merch-details';
// export { Cart } from './cart'
// export { Contact } from './contact';
// export { Featured };
// export { HowItWorks } from './how-it-works';
// export { MerchDetails };
// export { MerchList };
// export { Account };


import axios from 'axios';


function Storefront({ match }) {

    return(
      <div className="storefront">
          Storefront
          <div className="storefront-router">
            <Switch>
              <Route path="/" component={Featured} />
              <Route path={`${match.url}/`} component={Featured} />
              <Route path={`${match.url}/account`} component={Account} />
              <Route path={`${match.url}/contact`} component={Contact} />
              <Route path={`${match.url}/cart`} component={Cart} />
              <Route path={`${match.url}/how-it-works`} component={HowItWorks} />
              <Route exact path={`${match.url}/merch`} component={MerchList} />
              <Route path={`${match.url}/merch/:merchId`} component={MerchDetails} />
            </Switch>
          </div>
        <Footer />
      </div>
    );
};

export default withRouter(Storefront);