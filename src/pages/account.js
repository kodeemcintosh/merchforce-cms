import React from 'react';
import { Sidenav } from '../components/sidenav';

export function Account() {


  const handleLink = () => {

  }

  return (
    <div className="account">
      <Sidenav selectedLink={selectedLink} handleLink={handleLink} />
    </div>
  );
}