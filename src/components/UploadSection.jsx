import React from 'react';
import '../styles/components/UploadSection.css';




const UploadSection = ({ onImageUpload  , data , setdatanull}) => {
  return (
    <div className="upload-section">
      <label className="upload-label">Upload Microplastic Image</label>
      
      {!data &&<input
        className="upload-input"
        type="file"
        accept="image/*"
        onChange={onImageUpload}
      />}
      
      {data && <button className="upload-button" onClick={setdatanull}>Reset</button>} 
      
    </div>
  );
};

export default UploadSection;
