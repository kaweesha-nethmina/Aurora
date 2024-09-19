import React, { useState } from 'react';
import '../styles.css';

// Explicitly define the type for the new room state
interface NewRoom {
  name: string;
  description: string;
  images: string[]; // Explicitly set the type of images to string[]
}

interface RoomFormProps {
  onAddRoom: (room: NewRoom) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ onAddRoom }) => {
  const [newRoom, setNewRoom] = useState<NewRoom>({ name: '', description: '', images: [] });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setNewRoom({ ...newRoom, images: newImages });
    }
  };

  const handleAddRoom = () => {
    onAddRoom(newRoom);
    setNewRoom({ name: '', description: '', images: [] });
  };

  return (
    <div className="room-form">
      <h2>Add Room</h2>
      <form>
        <div>
          <input
            id="name"
            type="text"
            placeholder='Name'
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
        </div>
        <div>
          
          <textarea
            id="description"
            placeholder='Description'
            value={newRoom.description}
            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="images">Images</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="button" onClick={handleAddRoom}>
          Add Room
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
