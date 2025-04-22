import React, { useState } from 'react';
import '../styles/components/Results.css';

const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="results-section">
      <h3 onClick={() => setOpen(!open)} className="collapsible-header">
        {title} <span className="toggle-icon">{open ? '▲' : '▼'}</span>
      </h3>
      {open && <div>{children}</div>}
    </div>
  );
};

const InfoTooltip = ({ text }) => (
  <span className="tooltip-container">
    ⓘ
    <span className="tooltip-text">{text}</span>
  </span>
);

const Results = ({ data }) => {
  return (
    <div className="results-container">
      <h2>Detection Report</h2>

      <CollapsibleSection title="Per-Particle Attributes">
        <div className="result-card">
          <table className="result-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.particles.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.description} {p.tooltip && <InfoTooltip text={p.tooltip} />}</td>
                  <td>{p.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Per-Image Attributes">
        <div className="result-card">
          <table className="result-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.image.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Batch-Level Attributes">
        <div className="result-card">
          <table className="result-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.batch.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <div className="meta-info">
        <p><strong>Sample ID:</strong> {data.meta.sampleId}</p>
        <p><strong>Capture Date:</strong> {data.meta.date}</p>
        <p><strong>Calibration Factor:</strong> {data.meta.calibration}</p>
        <p><strong>Sampling Method:</strong> {data.meta.method}</p>
      </div>
    </div>
  );
};

export default Results;
