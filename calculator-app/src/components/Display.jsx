import React from 'react';

/**
 * Display Component
 * Shows the current active expression (e.g., "12 + 5") and the current input or result (e.g., "17").
 * 
 * Props:
 * @param {string} expression - The running calculation expression (e.g. "5 + 10 *")
 * @param {string} value - The active value being input or calculated result (e.g. "15")
 */
const Display = ({ expression, value }) => {
  return (
    <div className="calculator-display">
      {/* Expression history (small text above) */}
      <div className="expression-screen">
        {expression || '\u00A0'}
      </div>
      {/* Current input or final result (large text below) */}
      <div className="value-screen">
        {value || '0'}
      </div>
    </div>
  );
};

export default Display;
