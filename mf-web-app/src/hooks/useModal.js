
import React, { useState } from 'react';

export function useModal() {
  const [ modalStatus, setModalStatus ] = useState(false);

  const toggleModal = () => setModalStatus(!modalStatus);

  return [
    modalStatus,
    toggleModal
  ];
}