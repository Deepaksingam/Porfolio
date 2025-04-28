import React from 'react';
import './index.css'; // Import the CSS file

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>
);

export default Loader;