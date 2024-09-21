import React, { useState, useEffect } from 'react';
import './DisplayFeedbackPage.css';
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';
import axios from 'axios';

interface Feedback {
  id: string; // MongoDB ObjectId
  name: string;
  rating: number;
  description: string;
}

const DisplayFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [updatedFeedback, setUpdatedFeedback] = useState<Partial<Feedback>>({});
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>('http://localhost:5000/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleUpdate = async () => {
    if (selectedFeedback && updatedFeedback) {
      try {
        const response = await axios.put<{ feedback: Feedback }>(
          `http://localhost:5000/api/feedback/${selectedFeedback.id}`,
          updatedFeedback
        );
        const updatedFeedbacks = feedbacks.map(feedback =>
          feedback.id === selectedFeedback.id ? { ...feedback, ...response.data.feedback } : feedback
        );
        setFeedbacks(updatedFeedbacks);
        closeModal();
      } catch (error) {
        console.error('Error updating feedback:', error);
      }
    }
  };
  

  const handleDelete = async () => {
    if (selectedFeedback) {
      try {
        await axios.delete(`http://localhost:5000/api/feedback/${selectedFeedback.id}`);
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== selectedFeedback.id));
        closeModal();
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const handleSelectFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setUpdatedFeedback({
      name: feedback.name,
      rating: feedback.rating,
      description: feedback.description,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
    setUpdatedFeedback({});
  };

  return (
    <div className="feedback-container">
      <Header activeTab={''} />
      <Navbar />
      <div className="feedchat">
        <h2 className="feedback-title">Feedbacks</h2>
        <div className="feedback-card-container">
          {feedbacks.map(feedback => (
            <div
              key={feedback.id}
              className={`feedback-card ${selectedFeedback?.id === feedback.id ? 'selected' : ''}`}
              onClick={() => handleSelectFeedback(feedback)}
            >
              <h3 className="feedback-name">{feedback.name}</h3>
              <p className="feedback-rating">Rating: {feedback.rating}</p>
              <p className="feedback-description">{feedback.description}</p>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="update-title">Update Feedback</h3>
              <input
                type="text"
                value={updatedFeedback.name || ''}
                onChange={(e) => setUpdatedFeedback({ ...updatedFeedback, name: e.target.value })}
                className="feedback-input"
                placeholder="Update name"
              />
              <input
                type="number"
                value={updatedFeedback.rating || 0}
                onChange={(e) => setUpdatedFeedback({ ...updatedFeedback, rating: Math.max(0, Math.min(5, Number(e.target.value))) })} // Validate rating
                className="feedback-input"
                placeholder="Update rating"
                min="0"
                max="5"
              />
              <textarea
                value={updatedFeedback.description || ''}
                onChange={(e) => setUpdatedFeedback({ ...updatedFeedback, description: e.target.value })}
                className="feedback-input"
                placeholder="Update description"
              />
              <div className="feedback-buttons">
                <button onClick={handleUpdate} className="button-update">Update</button>
                <button onClick={handleDelete} className="button-delete">Delete</button>
                <button onClick={closeModal} className="button-cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayFeedbackPage;
