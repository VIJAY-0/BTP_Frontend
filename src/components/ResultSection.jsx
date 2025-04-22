import React from 'react';
import '../styles/components/ResultSection.css';
import Results from './Results';

const ResultSection = ({ result }) => {
  return (
    <div className="result-section">
      <h2 className="result-title">Classification Result</h2>
      {result ? (
              <Results data={result} />
      ) : (
        <p className="result-item">No result yet</p>
      )}
    </div>
  );
};

export default ResultSection;
