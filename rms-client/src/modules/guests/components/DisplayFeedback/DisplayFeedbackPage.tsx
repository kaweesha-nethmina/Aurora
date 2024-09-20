import { useState } from 'react';
import './DisplayFeedbackPage.css';

interface Feedback {
  id: number;
  name: string;
  feedback: string;
}

const initialFeedbacks: Feedback[] = [
  { id: 1, name: 'John Doe', feedback: 'This is a great product!' },
  { id: 2, name: 'Jane Doe', feedback: 'I love this product!' },
  { id: 3, name: 'Bob Smith', feedback: 'This product is amazing!' },
];

const DisplayFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [updatedFeedback, setUpdatedFeedback] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const handleUpdate = () => {
    if (selectedFeedback) {
      const updatedFeedbacks = [...feedbacks];
      const index = updatedFeedbacks.findIndex((feedback) => feedback.id === selectedFeedback.id);
      if (index !== -1) {
        updatedFeedbacks[index].feedback = updatedFeedback;
        setFeedbacks(updatedFeedbacks);
        setUpdatedFeedback('');
      }
    }
  };

  const handleDelete = () => {
    if (selectedFeedback) {
      const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== selectedFeedback.id);
      setFeedbacks(updatedFeedbacks);
      setSelectedFeedback(null);
    }
  };

  const handleSelectFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setUpdatedFeedback(feedback.feedback);
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Display Feedback Page</h2>
      <ul className="feedback-list">
        {feedbacks.map((feedback) => (
          <li
            key={feedback.id}
            className="feedback-item"
            onClick={() => handleSelectFeedback(feedback)}
          >
            <p className="feedback-name">{feedback.name}</p>
            <p className="feedback-text">{feedback.feedback}</p>
          </li>
        ))}
      </ul>
      {selectedFeedback && (
        <div>
          <input
            type="text"
            value={updatedFeedback}
            onChange={(e) => setUpdatedFeedback(e.target.value)}
            className="feedback-input"
            placeholder="Update feedback"
          />
          <div className="feedback-buttons">
            <button onClick={handleUpdate} className="button-update">
              Update
            </button>
            <button onClick={handleDelete} className="button-delete">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayFeedbackPage;
