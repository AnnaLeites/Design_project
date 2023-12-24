import React from 'react';
// import './RoomSelector.css'
const RoomSelector = ({ onRoomSelect }) => {
  const rooms = ['Bedroom', 'Bathroom', 'Living Room', 'Kitchen', 'Dining Room'];

  return (
    <div className="room-selector">
      <h2>Room Selector</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room}  
          className={`room-box ${room.toLowerCase().replace(' ', '-')}`}
          onClick={() => onRoomSelect(room)}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomSelector;
