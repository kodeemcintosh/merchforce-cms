import React, { useState, useEffect } from 'react';
import useModal from '../../../hooks';
import ImageViewer from '../../shared';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

export default withAuth(function MerchDetails({ match, auth }) {
  const [ modalStatus, toggleModal ] = useModal();
  const [ merchDetails, setMerchDetails ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(async () => {
    try {
      setIsLoading(true);

      const merchId = match.params.merchId;
      const accessToken = await auth.getAccessToken();

      let response = await axios.GET(`/merch/${merchId}`, {headers: {
        Authorization: `Bearer ${accessToken}`
      }})
      .then((res) => JSON.parse(res.body));

      setMerchDetails(response.merch);

      console.log('merchId:  ', merchId);
      setIsLoading(false);
    } catch(err) {
      console.warn(err);
      setIsLoading(false);
    }
  }, [id = match.params.merchId]);
  // }, [match.params.merchId]);

  if(isLoading) {
    return(
      <div>LOADING</div>
    );
  }

  return(
    <div className="merch-details">
      <ImageViewer
        isOpen={modalStatus}
        closeViewer={toggleModal}
        />
    </div>
  );
});
