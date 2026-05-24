import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

/**
 * Calculator Component
 * Manages the state, calculations, and combines Display and Button components.
 */
const Calculator = () => {
  // State variables
  const [displayValue, setDisplayValue] = useState('0'); // Current number on screen
  const [prevValue, setPrevValue] = useState(null);       // Stored number from previous input
  const [operation, setOperation] = useState(null);       // Active mathematical operator (+, -, *, /)
  const [expression, setExpression] = useState('');       // Shows the full operation expression (e.g., "12 + 5")
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false); // Flag to reset display on next number click

  // Performs the actual calculation
  const calculate = (a, b, op) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) return '0';

    let result;
    switch (op) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) return 'Error'; // Handle division by zero
        result = num1 / num2;
        break;
      default:
        return b;
    }

    // Solve floating-point precision issues (e.g., 0.1 + 0.2 = 0.30000000000000004)
    // We round to 10 decimal places and parseFloat converts it back to a clean number representation (removing trailing zeroes)
    return parseFloat(result.toFixed(10)).toString();
  };

  // Handles digit button clicks
  const handleDigit = (digit) => {
    // If the calculator is in a reset state (like after hitting '=' or an operator)
    if (displayValue === '0' || shouldResetDisplay) {
      setDisplayValue(digit);
      setShouldResetDisplay(false);
      
      // If we just hit equals, reset the historical expression
      if (expression.includes('=')) {
        setExpression('');
      }
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  // Handles decimal point clicks
  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplayValue('0.');
      setShouldResetDisplay(false);
      if (expression.includes('=')) {
        setExpression('');
      }
      return;
    }

    // Prevent multiple decimal points (e.g. 5.5.5)
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // Handles operator clicks (+, -, *, /)
  const handleOperator = (op) => {
    if (displayValue === 'Error') return;

    // If an operator is clicked and there's already an active operator but no new number typed:
    // This allows users to change their mind and click a different operator (e.g., type "5", click "+", change mind, click "*")
    if (operation && shouldResetDisplay) {
      setOperation(op);
      setExpression(`${prevValue} ${op}`);
      return;
    }

    if (prevValue === null) {
      // First number entered, ready for operator
      setPrevValue(displayValue);
      setOperation(op);
      setExpression(`${displayValue} ${op}`);
    } else if (operation) {
      // Second number entered, calculate the running total first
      const result = calculate(prevValue, displayValue, operation);
      setPrevValue(result);
      setOperation(op);
      setExpression(`${result} ${op}`);
      setDisplayValue(result);
    }

    setShouldResetDisplay(true);
  };

  // Handles equals (=) click to compute the final result
  const handleEvaluate = () => {
    if (!operation || prevValue === null || shouldResetDisplay || displayValue === 'Error') {
      return;
    }

    const result = calculate(prevValue, displayValue, operation);
    
    setExpression(`${prevValue} ${operation} ${displayValue} =`);
    setDisplayValue(result);
    setPrevValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  // Handles clearing the calculator (C)
  const handleClear = () => {
    setDisplayValue('0');
    setPrevValue(null);
    setOperation(null);
    setExpression('');
    setShouldResetDisplay(false);
  };

  // Handles backspace/deletion of the last digit (DEL)
  const handleDelete = () => {
    if (displayValue === 'Error' || shouldResetDisplay) return;

    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  // Handles toggling positive/negative sign (+/-)
  const handleToggleSign = () => {
    if (displayValue === '0' || displayValue === 'Error') return;
    
    if (displayValue.startsWith('-')) {
      setDisplayValue(displayValue.substring(1));
    } else {
      setDisplayValue('-' + displayValue);
    }
  };

  return (
    <div className="calculator-container">
      {/* 1. Display Screen (Composition) */}
      <Display expression={expression} value={displayValue} />

      {/* 2. Keypad Area (Composition with Button components) */}
      <div className="calculator-keypad">
        {/* Row 1 */}
        <Button label="C" onClick={handleClear} type="function" />
        <Button label="DEL" onClick={handleDelete} type="function" />
        <Button label="±" onClick={handleToggleSign} type="function" />
        <Button label="/" onClick={handleOperator} type="operator" />

        {/* Row 2 */}
        <Button label="7" onClick={handleDigit} />
        <Button label="8" onClick={handleDigit} />
        <Button label="9" onClick={handleDigit} />
        <Button label="*" onClick={handleOperator} type="operator" />

        {/* Row 3 */}
        <Button label="4" onClick={handleDigit} />
        <Button label="5" onClick={handleDigit} />
        <Button label="6" onClick={handleDigit} />
        <Button label="-" onClick={handleOperator} type="operator" />

        {/* Row 4 */}
        <Button label="1" onClick={handleDigit} />
        <Button label="2" onClick={handleDigit} />
        <Button label="3" onClick={handleDigit} />
        <Button label="+" onClick={handleOperator} type="operator" />

        {/* Row 5 */}
        <Button label="0" onClick={handleDigit} doubleWidth={true} />
        <Button label="." onClick={handleDecimal} />
        <Button label="=" onClick={handleEvaluate} type="operator" />
      </div>
    </div>
  );
};

export default Calculator;
