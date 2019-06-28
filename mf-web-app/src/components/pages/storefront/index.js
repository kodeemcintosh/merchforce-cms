import React, { useState, useEffect } from 'react';
// import { Switch, Route, Redirect } from 'react-router';
import { Route, Router } from 'react-router-dom';

import { withAuth, SecureRoute } from '@okta/okta-react';
import Header from '../../layout/header';
import { Footer } from '../../layout/footer';

// import Account from './account';
// import Featured from './featured';
// import MerchList from './merch-list';
// import MerchDetails from './merch-details';
// import { Cart } from './cart';
// import { Contact } from './contact';
// import { HowItWorks } from './how-it-works';

import Account from './account';
import Featured from './featured';
import MerchList from './merch-list';
import MerchDetails from './merch-details';
export { Cart } from './cart'
export { Contact } from './contact';
export { Featured };
export { HowItWorks } from './how-it-works';
export { MerchDetails };
export { MerchList };
export { Account };


// import axios from 'axios';

// export default withAuth(function Storefront({ auth, match }) {
//   const [ isAuthenticated, setIsAuthenticated ] = useState(null);

//   useEffect(() => {
//     const isAuth =  auth.isAuthenticated();

//     if(isAuth !== isAuthenticated) {
//       setIsAuthenticated(isAuth);
//     }
//   }, [auth]);

//   if(isAuthenticated === null) return null;

//   if(!isAuthenticated) {
//     auth.login("/");
//   }

//   return(
//     <div className="storefront">
//         Storefront
//         <div className="storefront-router">
//           <Router>
//             {/* <Route exact path="/" render={() => <Redirect to="/featured" />} />
//             <Route path="/featured" component={Featured} />
//             <Route path="/account" component={Account} />
//             <Route path="/contact" component={Contact} />
//             <Route path="/cart" component={Cart} />
//             <Route path="/how-it-works" component={HowItWorks} />
//             <Route exact path="/merch" component={MerchList} />
//             <Route path="/merch/:merchId" component={MerchDetails} />
//             <Route component={NotFound} /> */}












//             {/* <SecureRoute exact path={`${match.url}`} render={() => <Redirect to="/featured" />} /> */}
//             {/* <SecureRoute path={`${match.url}/featured`} component={Featured} /> */}

//             <Route path="/" component={Featured} />
//             <Route path={`${match.url}/`} component={Featured} />
//             <Route path={`${match.url}/account`} component={Account} />
//             <Route path={`${match.url}/contact`} component={Contact} />
//             <Route path={`${match.url}/cart`} component={Cart} />
//             <Route path={`${match.url}/how-it-works`} component={HowItWorks} />
//             <Route exact path={`${match.url}/merch`} component={MerchList} />
//             <Route path={`${match.url}/merch/:merchId`} component={MerchDetails} />

//             {/* <Route component={NotFound} /> */}
//           </Router>
//         </div>
//       <Footer />
//     </div>
//   );
// // });
// });
