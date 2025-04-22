#!/bin/bash

mkdir -p src/components

declare -A jsx

jsx["Header.jsx"]="import React from 'react';
import '../styles/components/Header.css';

const Header = () => {
  return (
    <header className=\"header\">
      <h1 className=\"header-title\">Microplastic Classifier</h1>
    </header>
  );
};

export default Header;
"

jsx["UploadSection.jsx"]="import React from 'react';
import '../styles/components/UploadSection.css';

const UploadSection = ({ onImageUpload }) => {
  return (
    <div className=\"upload-section\">
      <label className=\"upload-label\">Upload Microplastic Image</label>
      <input className=\"upload-input\" type=\"file\" accept=\"image/*\" onChange={onImageUpload} />
    </div>
  );
};

export default UploadSection;
"

jsx["ImagePreview.jsx"]="import React from 'react';
import '../styles/components/ImagePreview.css';

const ImagePreview = ({ imageUrl }) => {
  return imageUrl ? <img src={imageUrl} alt=\"Preview\" className=\"image-preview\" /> : null;
};

export default ImagePreview;
"

jsx["ResultSection.jsx"]="import React from 'react';
import '../styles/components/ResultSection.css';

const ResultSection = ({ result }) => {
  return (
    <div className=\"result-section\">
      <h2 className=\"result-title\">Classification Result</h2>
      {result ? (
        <div>
          <p className=\"result-item\">Class: {result.class}</p>
          <p className=\"result-item\">Confidence: {result.confidence}%</p>
          <p className=\"result-item\">Details: {result.details}</p>
        </div>
      ) : (
        <p className=\"result-item\">No result yet</p>
      )}
    </div>
  );
};

export default ResultSection;
"

jsx["Footer.jsx"]="import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className=\"footer\">
      &copy; 2025 Microplastic Insight Platform. All rights reserved.
    </footer>
  );
};

export default Footer;
"

for file in "${!jsx[@]}"; do
  echo "${jsx[$file]}" > "src/components/$file"
done

echo "✅ React components created and updated with regular CSS imports and classNames."
