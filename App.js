import React, { useState } from 'react';
import Header from './components/Header';
import RoomSelector from './components/RoomSelector';
import Result from './components/Result';
import InputBox from './components/InputBox';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [resultLength, setResultLength] = useState(null);


  console.log(resultLength)
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleOkButtonClick = () => {
    // Send data to the backend
    fetch('http://localhost:3001/api/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedRoom, inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update result length
        setResultLength(data.resultLength);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Header title="Interior Design Project" />
      <RoomSelector onRoomSelect={handleRoomSelect} />
      {/* Display chosen room */}
      {selectedRoom && <p>Selected Room: {selectedRoom}</p>}
      <InputBox onInputChange={handleInputChange} onOkButtonClick={handleOkButtonClick} />
      {/* Display result length */}
      {resultLength !== null && <Result length={resultLength} />}
    </div>
  );
}

export default App;
