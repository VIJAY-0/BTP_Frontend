import React from 'react';
import '../styles/components/ContourResults.css';


const downloadBase64Image = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

const ContourResults = ({ data }) => {
  if (!data) return <p>Loading...</p>;
    // console.log(data)

  return (
    <div className="contour-container">
      <h2>Contour Analysis</h2>

      <div className="image-section">
        <div className="image-box">
          <h3>Annotated Image</h3>
          <img
            src={`data:image/png;base64,${data.annotated_image}`}
            alt="Annotated"
          />
          <button
            className="download-btn"
            onClick={() =>
              downloadBase64Image(data.annotated_image, 'annotated.png')
            }
          >
            Download Image
          </button>
        </div>
        
      </div>

      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginTop: '20px' }}>
          Contour Statistics
        </h3>
        <p>Total Contours: {data.contour_count}</p>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Mean</th>
              <th>Median</th>
              <th>Std</th>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.stats).map(([metric, values]) => (
              <tr key={metric}>
                <td>{metric}</td>
                <td>{values.mean}</td>
                <td>{values.median}</td>
                <td>{values.std}</td>
                <td>{values.min}</td>
                <td>{values.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContourResults;
