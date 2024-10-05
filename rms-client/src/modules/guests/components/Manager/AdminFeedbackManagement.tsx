import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFeedbackManagement.css';
import UpdateFeedbackModal from './UpdateFeedbackModal'; // Import the modal

interface Rating {
  _id: string; // Ensure this matches your MongoDB _id
  name: string;
  rating: number;
  description: string;
}

const AdminFeedbackManagement = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Rating | null>(null);

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

  

  const handleUpdate = async (updatedFeedback: Rating) => {
    try {
      await axios.put(`http://localhost:5000/api/feedback/${updatedFeedback._id}`, updatedFeedback);
      setRatings(ratings.map(r => (r._id === updatedFeedback._id ? updatedFeedback : r)));
      closeModal();
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      setRatings(ratings.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="admin-feedback-management">
      <UpdateFeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        feedback={selectedFeedback}
        onUpdate={handleUpdate}
      />
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map(rating => (
            <tr key={rating._id}>
              <td>{rating.name}</td>
              <td>{rating.rating}</td>
              <td>{rating.description}</td>
              <td>
               
                <button className="btn-delete" onClick={() => handleDelete(rating._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbackManagement;
