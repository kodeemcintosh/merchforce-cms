
import React from 'react';
import useModal from '../../../hooks';
import ImageViewer from '../../shared';

export function MerchDetails({ match }) {
  const { modalStatus, toggleModal } = useModal();

  useEffect(() => {

    const getMerchDetails = () => {
      const merchId = match.params.merchId;
      console.log('merchId:  ', merchId);
    }

    getMerchDetails()
  })

  return(
    <div className="merch-details">
      <ImageViewer
        isOpen={modalStatus}
        closeViewer={toggleModal}
        />
    </div>
  );
}

