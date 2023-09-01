import React from 'react';
import '../css/styles.css';

const Modal = ({ largeImageURL, onClose }) => (
  <div className="Overlay" onClick={onClose}>
    <div className="Modal">
      <img src={largeImageURL} alt="" />
    </div>
  </div>
);

export default Modal;

