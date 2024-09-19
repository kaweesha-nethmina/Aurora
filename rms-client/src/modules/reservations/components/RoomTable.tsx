import React, { useState } from 'react';
import useRoomTable, { Room } from '../hooks/useRoomTable';
import './styles/RoomTable.css'; // Import the normal CSS

const RoomTable: React.FC = () => {
  const {
    rooms,
    loading,
    error,
    handleDelete,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleInputChange,
    editingRoom
  } = useRoomTable();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openEditModal = (room: Room) => {
    handleEdit(room);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    handleCancelEdit();
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="room-table-container">
      <h2 className="room-table-title">Room Table</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomType}</td>
              <td>${room.price.toFixed(2)}</td>
              <td>{room.rating}</td>
              <td>{room.description}</td>
              <td>
                <img src={room.image} alt={room.roomType} className="room-image" />
              </td>
              <td className="room-table-actions">
                <button className='editB' onClick={() => openEditModal(room)}>Edit</button>
                <button className='deleteB' onClick={() => handleDelete(room._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && editingRoom && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeEditModal}>X</button>
            <h3>Edit Room</h3>
            <label>
              Room Type:
              <input
                type="text"
                name="roomType"
                value={editingRoom.roomType}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={editingRoom.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                value={editingRoom.rating}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editingRoom.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={editingRoom.image}
                onChange={handleInputChange}
              />
            </label>
            <div className="modal-actions">
              <button className="modal-save" onClick={handleSaveEdit}>Save</button>
              <button className="modal-cancel" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTable;
