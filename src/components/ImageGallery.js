import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import '../css/styles.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt=""
        largeImageURL={largeImageURL}
        onClick={() => onImageClick(largeImageURL)}
      />
    ))}
  </ul>
);

export default ImageGallery;

