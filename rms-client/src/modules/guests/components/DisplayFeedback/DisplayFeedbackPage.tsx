import { useState, useEffect } from 'react';
import './DisplayFeedbackPage.css';
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';
import axios from 'axios';

interface Feedback {
  _id: string; // MongoDB ObjectId
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
          `http://localhost:5000/api/feedback/${selectedFeedback._id}`,
          updatedFeedback
        );
        const updatedFeedbacks = feedbacks.map(feedback =>
          feedback._id === selectedFeedback._id ? { ...feedback, ...response.data.feedback } : feedback
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
        await axios.delete(`http://localhost:5000/api/feedback/${selectedFeedback._id}`);
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== selectedFeedback._id));
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

  // Function to render stars based on the rating value
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9', fontSize: '20px' }}>
        ★
      </span>
    ));
  };

  return (
    <div className="feedback-container">
      <Header activeTab={'feedback'} />
      <Navbar />
      <div className="feedchat">
        <h2 className="feedback-title">Feedbacks</h2>
        <div className="feedback-card-container">
          {feedbacks.map(feedback => (
            <div
              key={feedback._id}
              className={`feedback-card ${selectedFeedback?._id === feedback._id ? 'selected' : ''}`}
              onClick={() => handleSelectFeedback(feedback)}
            >
              <h3 className="feedback-name">{feedback.name}</h3>
              <p className="feedback-rating">Rating: {renderStars(feedback.rating)}</p>
              <p className="feedback-description">{feedback.description}</p>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="update-title">Update Feedback</h3>
              <div className="feedback-field">
                <label className="feedback-label" htmlFor="update-name">Name</label>
                <input
                  className="feedback-input"
                  id="update-name"
                  type="text"
                  value={updatedFeedback.name}
                  onChange={(e) => setUpdatedFeedback({ ...updatedFeedback, name: e.target.value })}
                />
              </div>
              <div className="feedback-field">
                <label className="feedback-label" htmlFor="update-rating">Rating</label>
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <span
                        key={ratingValue}
                        onClick={() => setUpdatedFeedback({ ...updatedFeedback, rating: ratingValue })}
                        style={{
                          cursor: 'pointer',
                          color: ratingValue <= (updatedFeedback.rating || 0) ? '#ffc107' : '#e4e5e9',
                          fontSize: '24px',
                        }}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="feedback-field">
                <label className="feedback-label" htmlFor="update-description">Description</label>
                <textarea
                  className="feedback-input"
                  id="update-description"
                  value={updatedFeedback.description}
                  onChange={(e) => setUpdatedFeedback({ ...updatedFeedback, description: e.target.value })}
                />
              </div>
              <button onClick={handleUpdate} className="feedback-submit">Update</button>
              <button onClick={handleDelete} className="feedback-submit">Delete</button>
              <button onClick={closeModal} className="feedback-submit">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayFeedbackPage;
