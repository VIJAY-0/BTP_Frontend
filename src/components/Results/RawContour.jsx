import React from 'react';
import './RawContourTable.css';
import * as XLSX from 'xlsx';

const RawContourTable = ({ rawMetrics }) => {
  if (!rawMetrics )
    return null;

    console.log(rawMetrics)
  const histograms = rawMetrics.histogram_images
  const units = rawMetrics.units

  rawMetrics = rawMetrics.parameters
  const metricNames = Object.keys(rawMetrics);
  const rowCount = rawMetrics[metricNames[0]].length;

  const handleDownloadExcel = () => {
    // Build an array of row objects: { Index: 1, Area: ..., Perimeter: ..., ... }
    const data = Array.from({ length: rowCount }, (_, i) => {
      const row = { Index: i + 1 };
      metricNames.forEach((name) => {
        row[name] = rawMetrics[name][i];
      });
      return row;
    });

    // Create worksheet & workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contours');

    // Trigger download
    XLSX.writeFile(wb, 'contour_data.xlsx');
  };
  const downloadBase64Image = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <>
         <button className="excel-btn" onClick={handleDownloadExcel}>
        Download as Excel
      </button>

    <div className="raw-table-container">
      <table className="raw-table">
        <thead>
          <tr>
            <th>Index</th>
            {metricNames.map((name) => (
                <th key={name}>{name} {units[name]===''?units[name]:`(`+units[name]+`)`} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, i) => (
              <tr key={i}>
              <td className="index-cell">{i + 1}</td>
              {metricNames.map((name) => (
                  <td key={name}>{rawMetrics[name][i]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            
        
    <div className="histogram-gallery">
  {Object.entries(histograms).map(([param, image]) => (
    <div className="histogram-card" key={param}>
      <h3 className="histogram-title">{param}</h3>
      <img
        src={`data:image/png;base64,${image}`}
        alt="Histogram"
        className="histogram-image"
      />
      <button
        className="btn-download"
        onClick={() =>
          downloadBase64Image(image, `histogram_${param}.png`)
        }
      >
        Download Histogram
      </button>
    </div>
  ))}
</div>
          </>
  );
};

export default RawContourTable;
