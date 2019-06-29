import React, { useEffect, useState } from 'react';
// import { useStore } from '../../../hooks/useStore';
import Okta from '../../../auth/Okta';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

function MerchList({ auth }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ merch, setMerch ] = useState([])
  const [ pageNumber, setPageNumber ] = useState(0)

  useEffect(() => {
    async function getMerch() {
      let params = {
        pageNumber,
      };
      let accessToken = auth.getAccessToken();

      let response = await axios.GET('/merch', {headers: {
        Authorization: `Bearer ${accessToken}`
        }}, params)
        .then((res) => JSON.parse(res));

      setMerch(response.body.merch);
    }

    try {
      setIsLoading(true);


      getMerch();
      // response = JSON.parse(response.body);

      setIsLoading(false);
    } catch(err) {
      console.warn(err);
    }
  }, [auth, pageNumber]);
  
  const handlePagination = (next) => setPageNumber(pageNumber + next)

  if(isLoading) {
    return (
      <div>LOADING</div>
    )
  }

  return(
    <div className="merch-list">
      {merch.map((item) => {
        return (
          <div className="merch-item">
            <img className="primary-image" src={item.defaultImage} alt={item.defaultImage} />
            {item.colors.map((color) => {
              return (
                <div className="secondary-image-container"><img className="secondary-image" src={color.img} alt={color.img} /></div>
              );
            })}
          </div>
        )
      })}

      <div onClick={() => handlePagination(-1)}>previousPage</div>
      <div onClick={() => handlePagination(1)}>nextPage</div>
    </div>
  );
};

export default withAuth(MerchList);