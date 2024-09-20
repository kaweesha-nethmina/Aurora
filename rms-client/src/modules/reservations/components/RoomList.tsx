
import React from 'react';
import { Room } from './../utils/roomData';

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="room-list-container">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.roomType} className="room-image" />
            <div className="room-details">
              <h3>{room.roomType}</h3>
              <p>{room.description}</p>
              <p>Price: ${room.price}</p>
              <p>Rating: {room.rating}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No rooms found</p>
      )}
    </div>
  );
};

export default RoomList;
