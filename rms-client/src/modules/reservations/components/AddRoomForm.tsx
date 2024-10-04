import React from 'react';
import { useRoomForm } from '../hooks/useRoomForm';
import styles from '../AddRoomForm.module.css';

const AddRoomForm: React.FC = () => {
  const { roomFormState, handleInputChange, handleImageChange, handleSubmit } = useRoomForm();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Room Form</h2>
      <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={roomFormState.roomType}
            onChange={handleInputChange}
            required
            className={styles.input}
          >
            <option value="">Select a room type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="deluxe">Deluxe Room</option>
            <option value="suite">Suite Room</option>
          </select>
        </div>

        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="price">Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={roomFormState.price}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={roomFormState.description}
            onChange={handleInputChange}
            required
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
