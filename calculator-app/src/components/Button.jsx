import React from 'react';

/**
 * Button Component
 * Reusable button for numbers, operators, and special functions.
 * 
 * Props:
 * @param {string} label - The text displayed on the button (e.g. "7", "+", "=")
 * @param {function} onClick - The callback function executed when clicked
 * @param {string} type - Button category: 'number', 'operator', or 'function' (for styling)
 * @param {boolean} doubleWidth - If true, button occupies 2 columns in the grid layout
 */
const Button = ({ label, onClick, type = 'number', doubleWidth = false }) => {
  // Construct class name dynamically based on button type and layout requirements
  const buttonClassName = [
    'calc-btn',
    type === 'operator' ? 'btn-operator' : '',
    type === 'function' ? 'btn-function' : '',
    doubleWidth ? 'btn-double' : ''
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClassName} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;
