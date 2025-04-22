import React, { useState, useEffect, useMemo } from 'react';
import '../styles/components/SetParams.css';

const SetParams = ({ onParamsChange }) => {
  const defaultParams = useMemo(() => ({
    threshold: 127,
    kernelSize: 3,
    applySkeleton: true,
    filterNoise: true
  }), []);

  const presets = useMemo(() => ({
    Default: { ...defaultParams },
    HighSensitivity: {
      threshold: 90,
      kernelSize: 5,
      applySkeleton: true,
      filterNoise: false
    },
    FastPreview: {
      threshold: 150,
      kernelSize: 1,
      applySkeleton: false,
      filterNoise: false
    }
  }), [defaultParams]);

  const [params, setParams] = useState({ ...defaultParams });
  const [selectedPreset, setSelectedPreset] = useState('Default');

  useEffect(() => {
    onParamsChange(params); // Immediate call
  }, [params]);

  const handlePresetChange = (e) => {
    const preset = e.target.value;
    if (presets[preset]) {
      setParams({ ...presets[preset] }); // clone to avoid mutation
    }
    setSelectedPreset(preset);
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
    setSelectedPreset('Custom');
  };

  const resetToDefault = () => {
    setParams({ ...defaultParams });
    setSelectedPreset('Default');
  };

  return (
    <div className="setparams-container">
      <h3>Detection Parameters</h3>

      <label>
        Preset:
        <select value={selectedPreset} onChange={handlePresetChange}>
          {Object.keys(presets).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
          <option value="Custom">Custom</option>
        </select>
      </label>

      <label>
        Threshold: {params.threshold}
        <input
          type="range"
          name="threshold"
          min="0"
          max="255"
          value={params.threshold}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Kernel Size: {params.kernelSize}
        <input
          type="range"
          name="kernelSize"
          min="1"
          max="15"
          step="2"
          value={params.kernelSize}
          onChange={handleInputChange}
        />
      </label>

      <label>
        <input
          type="checkbox"
          name="applySkeleton"
          checked={params.applySkeleton}
          onChange={handleInputChange}
        />
        Use Skeletonization
      </label>

      <label>
        <input
          type="checkbox"
          name="filterNoise"
          checked={params.filterNoise}
          onChange={handleInputChange}
        />
        Filter Noise
      </label>

      <button onClick={resetToDefault} className="reset-button">Reset to Default</button>
    </div>
  );
};

export default SetParams;
