
import React from 'react';
import ReactDOM from 'react-dom';

export const Modal = ({ isOpen, close, children }) => isOpen ? ReactDOM.createPortal(
  <div className="modal">
    <div className="close button" onClick={close}>
      <icon className="close" />
    </div>
    {children}
  </div>
) : null;
