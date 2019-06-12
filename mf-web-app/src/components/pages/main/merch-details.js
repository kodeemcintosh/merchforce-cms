
import React from 'react';
import useModal from '../../../hooks';
import ImageViewer from '../../shared';

export function MerchDetails() {
  const { modalStatus, toggleModal } = useModal();

  return(
    <div className="merch-details">
      <ImageViewer
        isOpen={modalStatus}
        closeViewer={toggleModal}
        />
    </div>
  );
}

