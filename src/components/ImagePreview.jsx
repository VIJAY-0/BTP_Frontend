import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/ImagePreview.css';

const ImagePreview = ({ file, onRemove }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isTiff, setIsTiff] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    if (!file) return;

    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];

    if (file.type.startsWith('image/') && supportedTypes.includes(file.type)) {
      const objectUrl = URL.createObjectURL(file);
      setImageSrc(objectUrl);
      setIsTiff(false);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (file.name.endsWith('.tif') || file.name.endsWith('.tiff')) {
      setIsTiff(true);
      const reader = new FileReader();
      reader.onload = function (e) {
        // Load TIFF.js script dynamically
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/tiff@0.14.0.js';
        script.onload = () => {
          const buffer = e.target.result;
          const tiff = new window.TIFF({ buffer });
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            const img = tiff.toCanvas();
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          }
        };
        document.body.appendChild(script);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setImageSrc(null);
      setIsTiff(false);
    }
  }, [file]);

  if (!file) return null;

  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-filename">{file.name}</span>
        {onRemove && (
          <button className="remove-btn" onClick={onRemove}>
            ×
          </button>
        )}
      </div>

      <div
        className={`preview-wrapper ${isZoomed ? 'zoomed' : ''}`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {isTiff ? (
          <canvas ref={canvasRef} className="image-preview" />
        ) : imageSrc ? (
          <img src={imageSrc} alt="Preview" className="image-preview" />
        ) : (
          <div className="unsupported-text">Preview not supported</div>
        )}
        <div className="hover-text">Click to {isZoomed ? 'shrink' : 'zoom'}</div>
      </div>
    </div>
  );
};

export default ImagePreview;
