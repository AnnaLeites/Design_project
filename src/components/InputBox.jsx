import React, { useState } from 'react';

const InputBox = ({ onInputChange, onOkButtonClick }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Accepts only English letters and spaces
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={onOkButtonClick}>OK</button>
    </div>
  );
};

export default InputBox;
