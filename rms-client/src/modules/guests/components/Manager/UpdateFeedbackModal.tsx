import React, { useState } from 'react';

interface Rating {
  _id: string;
  name: string;
  rating: number;
  description: string;
}

interface UpdateFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: Rating | null;
  onUpdate: (updatedFeedback: Rating) => void;
}

const UpdateFeedbackModal: React.FC<UpdateFeedbackModalProps> = ({ isOpen, onClose, feedback, onUpdate }) => {
  const [updatedName, setUpdatedName] = useState(feedback ? feedback.name : '');
  const [updatedRating, setUpdatedRating] = useState(feedback ? feedback.rating : 0);
  const [updatedDescription, setUpdatedDescription] = useState(feedback ? feedback.description : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) {
      onUpdate({ ...feedback, name: updatedName, rating: updatedRating, description: updatedDescription });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Feedback</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Name"
            required
          />
          <select
            value={updatedRating}
            onChange={(e) => setUpdatedRating(Number(e.target.value))}
            required
          >
            {[...Array(6).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFeedbackModal;
