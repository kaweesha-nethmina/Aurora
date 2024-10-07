import React from 'react';
import { Link } from 'react-router-dom';
import { Room as RoomType } from '../services/roomService';

interface RoomCardProps {
  room: RoomType;
  isDetailVisible: boolean;
  onToggleDetail: () => void;
}

const RoomCard: React.FC<RoomCardProps> = React.memo(({ room, isDetailVisible, onToggleDetail }) => {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.roomType} className="room-image" />
      <h2 className="room-name">{room.roomType}</h2>
      <p className="room-price">LKR.{room.price} per night</p>
      <button onClick={onToggleDetail} className="details-button12">
        {isDetailVisible ? 'Hide Details' : 'View Details'}
      </button>
      {isDetailVisible && <p className="room-description">{room.description}</p>}
      <Link to={`/formroom/${room._id}?roomType=${encodeURIComponent(room.roomType)}`}>

        <button className="book-button12">Book Now</button>
      </Link>
    </div>
  );
});

export default RoomCard;
