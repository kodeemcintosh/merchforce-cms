import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { Header } from '../../layout/header';
import { Footer } from '../../layout/footer';
import { Account } from './account';
import { Cart } from './cart'
import { Contact } from './contact';
import { Featured } from './featured';
import { HowItWorks } from './how-it-works';
import { MerchList } from './merch-list';
import { MerchDetails } from './merch-details';

export function Storefront() {

  return(
    <div className="storefront">
      <Header />
        <div className="app-router">
          <Switch>
            <Redirect exact from="/" to="/featured" />
            <Route to="/featured" component={Featured} />
            <Route to="/account" component={Account} />
            <Route to="/contact" component={Contact} />
            <Route to="/cart" component={Cart} />
            <Route to="/how-it-works" component={HowItWorks} />
            <Route to="/merch" component={MerchList} />
            <Route to="/merch/:merchId" component={MerchDetails} />
            <Route component={NotFound} />
          </Switch>
        </div>
      <Footer />
    </div>
  );
}
