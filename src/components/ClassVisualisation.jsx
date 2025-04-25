import React from "react";
import "./../styles/components/ClassVisualisation.css"; // import the CSS

const ClassVisualization = ({ branchingDist }) => {
    // if(!branchingDist) return (<></> ); // Check if branchingDist is null or undefined

  return (
    <>
    <h2>Branching Classification</h2>
    <div className="viz-container">
      {Object.entries(branchingDist).map(([className, data]) => (
          <div className="viz-card" key={className}>
          <h2 className="viz-title">{className}</h2>
          <img
            src={`data:image/png;base64,${data.inverted_masked_image}`}
            alt={`${className} visualization`}
            className="viz-image"
            />
          <p className="viz-info">
            <strong>Contours:</strong> {data.num_contours}
          </p>
        </div>
      ))}
    </div>
      </>
  );
};


export default ClassVisualization;
