import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';

import axios from 'axios';

import { withAuth, SecureRoute } from '@okta/okta-react';
import Header from '../../layout/header';
import { Footer } from '../../layout/footer';

import Account from './account';
import Featured from './featured';
import MerchList from './merch-list';
import MerchDetails from './merch-details';
import { Cart } from './cart';
import Contact from './contact';
import { HowItWorks } from './how-it-works';
import { setupMaster } from 'cluster';


function Storefront({ auth, match }) {
  const [ account, setAccount ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ cart, setCart ] = useState(null);

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.user));

    getCart()
      .then((res) => setCart(response.body.cart));

  }, []);



  const filterCartToSummary = (cart) => {
    let total = 0;

    let items = cart.items.map((item) => {
      total += item.price.actual;

      return {
        id: item.id,
        quantity: item.quantity,
        img: item.img
      };
    });

    return {
      total,
      items
    }
  };

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

export default withRouter(withAuth(Storefront));