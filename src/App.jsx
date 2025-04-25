import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ImagePreview from './components/ImagePreview';
import Footer from './components/Footer';
import DownloadReportButton from './components/DownloadReportButton'; // <-- Add this line
import ContourResults from './components/RecievedResults';
import RawContourTable from './components/Results/RawContour';
import ClassVisualization from './components/ClassVisualisation';

import './App.css';

  

const BASE_URL = 'https://btp-backend-x24y.onrender.com'; // Replace with your CORS server endpoint

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // console.log('Image URL:', file);

      // Create form data to send the file
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(`${BASE_URL}/api/process_image/`, {
          method: 'POST',
          body: formData,
          // mode: "no-cors",
        });

        // setResult({'loading': true});
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        // console.log(data['data'])
        setResult(data['data']); // Assuming the API returns the result in the response
      
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">

        <UploadSection onImageUpload={handleImageUpload} data={result} setdatanull={handleReset} />
        <ImagePreview file={image} />
        <ContourResults data={result} image={image}/>
        <RawContourTable rawMetrics={result}/>
        {result && <ClassVisualization branchingDist={result.branching_dist} />}
        {result && <DownloadReportButton results={result} />} {/* Add this */}

      </main>
      <Footer />
    </div>
  );
};

export default App;
