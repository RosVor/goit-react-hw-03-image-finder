import React from 'react';
import '../css/styles.css';

const Button = ({ onClick }) => (
  <button type="button" className="Button" onClick={onClick}>
    Load more
  </button>
);

export default Button;

