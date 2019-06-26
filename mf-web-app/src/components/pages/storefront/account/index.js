import React, { useEffect } from 'react';
import { withAuth } from '@okta/okta-react';

// import { NavLink } from 'react-router-dom';
import useUser from '../../../../hooks/useUser';
import { Overview } from './overview';
import { Profile } from './profile';
import { OrderDetails } from './order-details';
import { Orders } from './orders';
import { ChangePassword } from './change-password';
import { Receipts } from './receipts';

export default withAuth(function Account({ match, auth }) {

  // const [ user, setUser ] = useState(null);
  // const [ account, setAccount ] = useState(null);
  const [ user ] = useUser();

  // useEffect(async () => {
  //   let user = await auth.getUser();
  //   setUser(user);k
  //     .then((user) => setUser(user));

  //   const [ userAccount ] = await useUser();

  //   setAccount(userAccount);
  // }, []);

  useEffect();

  if(!user) return null;

  return (
    <div className="account">
      {/* <Sidenav /> */}
      <div className="account-router">
        <Overview />
        <Profile />
        <Orders />
        <OrderDetails />
        <ChangePassword />
        <Receipts />
        {/* <Switch>
          <Route exact path={`${match.url}`} component={() => <Overview />}></Route>
          <Route path={`${match.url}/profile`} component={() => <Profile />}></Route>
          <Route exact path={`${match.url}/orders`} component={() => <Orders />}></Route>
          <Route path={`${match.url}/orders/:orderId`} component={() => <OrderDetails />}></Route>
          <Route path={`${match.url}/change-password`} component={() => <ChangePassword />}></Route>
          <Route path={`${match.url}/receipts`} component={() => <Receipts />}></Route>
        </Switch> */}
      </div>
    </div>
  );
});

// const Sidenav = () => {

//   return (
//     <div className="sidenav">
//       <NavLink id="overview" className="overview" activeClassName="active" to="/account">Overview</NavLink>
//       <NavLink id="profile" className="profile" activeClassName="active" to="/account/profile">Profile</NavLink>
//       <NavLink id="orders" className="orders" activeClassName="active" to="/account/orders">Previous Orders</NavLink>
//       <NavLink id="order-details" className="order-details" activeClassName="active" to="/account/orders/">Previous Orders</NavLink>
//       <NavLink id="change-password" className="change-password" activeClassName="active" to="/account/change-password">Change Password</NavLink>
//       <NavLink id="receipts" className="receipts" activeClassName="active" to="/account/receipts">Receipts</NavLink>
//     </div>
//   );
// }