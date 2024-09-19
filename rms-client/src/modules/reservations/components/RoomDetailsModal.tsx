import React from 'react';
import { Room } from '../hooks/useRooms';

interface RoomDetailsModalProps {
  room: Room;
  onClose: () => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{room.name}</h2>
        <p className="modal-description">{room.description}</p>
        <ul className="modal-facilities">
          {room.facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
        <button onClick={onClose} className="btn-danger">
          Close
        </button>
      </div>
    </div>
  );
};

export default RoomDetailsModal;
