import React, { useEffect, useState } from 'react';
import { useStore } from '../../../hooks/useStore';
import { withAuth } from '@okta/okta-react';

export default withAuth(function MerchList({ auth }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ merch, setMerch ] = useState([])
  const [ pageNumber, setPageNumber ] = useState(0)

  useEffect(async () => {
    try {
      setIsLoading(true);
      let params = {
        pageNumber,
      }

      let accessToken = await auth.getAccessToken();

      let response = await axios.GET('/merch', {headers: {
        Authorization: `Bearer ${accessToken}`
        }}, params);
      // response = JSON.parse(response.body);

      setMerch(response.merch);
      setIsLoading(false);

      console.log('merchList:  ', merchList);
    } catch(err) {
      console.warn(err);
    }
  }, [pageNumber]);


  return(
    <div className="merch-list">
      {merch.map((item) => {
        return (
          <div className="merch-item">
            <img className="primary-image" src={item.defaultImage} />
            {item.colors.map((color) => {
              

            })}
          </div>
        )
      })}
    </div>
  );
});