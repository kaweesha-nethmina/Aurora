import React, { ChangeEvent } from 'react';
import { Room } from '../states/types';

interface RoomEditModalProps {
  selectedRoom: Room | null;
  onUpdateRoom: () => void;
  onChange: (room: Room) => void;
}

const RoomEditModal: React.FC<RoomEditModalProps> = ({ selectedRoom, onUpdateRoom, onChange }) => {
  if (!selectedRoom) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      onChange({ ...selectedRoom, images: newImages });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Room</h2>
        <form>
          <div>
            
            <input
              id="name"
              type="text"
              placeholder='Name'
              value={selectedRoom.name}
              onChange={(e) => onChange({ ...selectedRoom, name: e.target.value })}
            />
          </div>
          <div>
            
            <textarea
              id="description"
              placeholder='Description'
              value={selectedRoom.description}
              onChange={(e) => onChange({ ...selectedRoom, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="images">Images</label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="image-preview">
              {selectedRoom.images.map((image, index) => (
                <img key={index} src={image} alt={`Room image ${index + 1}`} />
              ))}
            </div>
          </div>
          <button type="button" onClick={onUpdateRoom}>
            Update Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomEditModal;

