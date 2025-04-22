import React from 'react';
import '../styles/components/UploadSection.css';




const UploadSection = ({ onImageUpload }) => {
  return (
    <div className="upload-section">
      <label className="upload-label">Upload Microplastic Image</label>
      
      <input
        className="upload-input"
        type="file"
        accept="image/*"
        onChange={onImageUpload}
      />
      
      <button className="upload-button" onClick={onImageUpload}>
        Upload
      </button>
      
    </div>
  );
};

export default UploadSection;
