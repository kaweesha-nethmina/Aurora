import { useState } from 'react';
import './AdminPage.css';

interface Feedback {
  id: number;
  rating: number;
  comment: string;
}

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: 1, rating: 5, comment: 'Great service!' },
    { id: 2, rating: 3, comment: 'Average experience.' },
    { id: 3, rating: 4, comment: 'Good job!' },
  ]);

  const handleDelete = (id: number) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  };

  const handleAccept = (id: number) => {
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.id === id) {
        return { ...feedback, accepted: true };
      }
      return feedback;
    });
    setFeedbacks(updatedFeedbacks);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Feedback and Ratings</h1>
      <div className="admin-feedback-list">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="admin-feedback-item">
            <h2 className="admin-feedback-rating">
              Rating: {feedback.rating}/5
            </h2>
            <p className="admin-feedback-comment">{feedback.comment}</p>
            <div className="admin-feedback-actions">
              <button
                className="admin-delete-button"
                onClick={() => handleDelete(feedback.id)}
              >
                Delete
              </button>
              <button
                className="admin-accept-button"
                onClick={() => handleAccept(feedback.id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
