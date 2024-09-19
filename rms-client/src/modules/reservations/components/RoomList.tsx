import React from 'react';
import { Room } from '../states/types';
import roomI from '../images/image1.jpg';

interface RoomListProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (id: number) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="room-list">
      <h2>Room List</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <div className="room-details">
              <h3>{room.name}</h3>
              <button onClick={() => onEdit(room)}>Edit</button>
              <button onClick={() => onDelete(room.id)}>Delete</button>
            </div>
            <p>{room.description}</p>
            <div className="room-images">
              {room.images.map((_, index) => (
                <img
                  key={index}
                  src={roomI}  // Use the imported image for all items
                  alt={room.name}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
