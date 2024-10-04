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
      <img src={room.image} alt={room.roomType} className="room-image" />
      <h2 className="room-name">{room.roomType}</h2> {/* Display roomType instead of name */}
      <p className="room-type">{room.roomType}</p> {/* Display room type */}
      <p className="room-price">${room.price} per night</p>
      <button onClick={() => onShowDetails(room.id)} className="details-button">
        {showDetails[room.id] ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails[room.id] && <p className="room-description">{room.description}</p>}

      <Link to="/formroom">
        <button className="book-button">Book Now</button>
      </Link>
    </div>
  );
};


export default RoomCard;
