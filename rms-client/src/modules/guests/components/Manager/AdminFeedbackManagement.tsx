import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Rating {
  id: string;
  name: string;
  rating: number;
  description: string;
}

const AdminFeedbackManagement = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedRating, setUpdatedRating] = useState(0);
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get<Rating[]>('http://localhost:5000/api/feedback');
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchRatings();
  }, []);

  const handleEdit = (rating: Rating) => {
    setIsEditing(true);
    setEditingId(rating.id);
    setUpdatedName(rating.name);
    setUpdatedRating(rating.rating);
    setUpdatedDescription(rating.description);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      const updatedData = { name: updatedName, rating: updatedRating, description: updatedDescription };
      try {
        await axios.put(`http://localhost:5000/api/feedback/${editingId}`, updatedData);
        setRatings(ratings.map(r => (r.id === editingId ? { ...r, ...updatedData } : r)));
        resetForm();
      } catch (error) {
        console.error('Error updating feedback:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      setRatings(ratings.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setUpdatedName('');
    setUpdatedRating(0);
    setUpdatedDescription('');
  };

  return (
    <div>
      <h2>Admin Feedback Management</h2>
      {isEditing && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <select
            value={updatedRating}
            onChange={(e) => setUpdatedRating(Number(e.target.value))}
          >
            {[...Array(6).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <button type="submit">Update</button>
          <button onClick={resetForm}>Cancel</button>
        </form>
      )}
      <ul>
        {ratings.map(rating => (
          <li key={rating.id}>
            <h3>{rating.name}</h3>
            <p>Rating: {rating.rating}</p>
            <p>{rating.description}</p>
            <button onClick={() => handleEdit(rating)}>Edit</button>
            <button onClick={() => handleDelete(rating.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFeedbackManagement;
