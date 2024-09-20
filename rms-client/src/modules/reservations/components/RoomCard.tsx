import React from 'react';
import { Link } from 'react-router-dom';
import { Room as RoomType } from '../services/roomService'; // Adjust the import path as needed

interface RoomCardProps {
  room: RoomType;
  onShowDetails: (id: string) => void; // Changed to string
  showDetails: { [key: string]: boolean };
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onShowDetails, showDetails }) => {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.name} className="room-image" />
      <h2 className="room-name">{room.name}</h2>
      <p className="room-price">${room.price} per night</p>
      <p className="room-rating">Rating: {room.rating}/5</p>
      <button onClick={() => onShowDetails(room.id)} className="details-button">
        {showDetails[room.id] ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails[room.id] && <p className="room-description">{room.description}</p>}

      <Link to="/form">
        <button className="book-button">Book Now</button>
      </Link>
    </div>
  );
};

export default RoomCard;
