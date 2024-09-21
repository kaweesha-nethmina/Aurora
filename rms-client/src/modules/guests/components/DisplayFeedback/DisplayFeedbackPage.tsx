import { useState } from 'react';
import './DisplayFeedbackPage.css';
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';

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
      <Header activeTab={''} />
      <Navbar />
      <div className='feedchat'>
        <h2 className="feedback-title">Feedbacks</h2>
        <div className="feedback-card-container">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className={`feedback-card ${selectedFeedback?.id === feedback.id ? 'selected' : ''}`}
              onClick={() => handleSelectFeedback(feedback)}
            >
              <p className="feedback-name">{feedback.name}</p>
              <p className="feedback-text">{feedback.feedback}</p>
            </div>
          ))}
        </div>
        {selectedFeedback && (
          <div className="feedback-form">
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
    </div>
  );
};

export default DisplayFeedbackPage;
