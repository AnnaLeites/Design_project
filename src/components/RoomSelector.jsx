import React from 'react';

const RoomSelector = ({ onRoomSelect }) => {
  const rooms = ['Bedroom', 'Bathroom', 'Living Room', 'Kitchen', 'Office'];

  return (
    <div>
      <h2>Room Selector</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room} onClick={() => onRoomSelect(room)}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomSelector;
