import React from 'react';
import '../css/styles.css';

const ImageGalleryItem = ({ src, alt, onClick }) => (
  <li className="ImageGalleryItem" onClick={onClick}>
    <img src={src} alt={alt} className="ImageGalleryItem-image" />
  </li>
);

export default ImageGalleryItem;

