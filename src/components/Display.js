import React from 'react';

export const Display = ({value, onChange}) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="display"
  />
);
