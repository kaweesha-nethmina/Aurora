import React, { useState } from 'react';
import './FeedbackRatingPage.css';
import Header from '../../../core/components/Header';
import { Link } from 'react-router-dom';
import Navbar from '../nav/GNavbar';

interface Rating {
  id: number;
  name: string;
  rating: number;
  description: string;
}

const FeedbackRatingPage = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      const updatedRatings = [...ratings];
      updatedRatings[editingIndex] = { id: editingIndex, name, rating, description };
      setRatings(updatedRatings);
      setIsEditing(false);
    } else {
      setRatings([...ratings, { id: ratings.length, name, rating, description }]);
    }
    setName('');
    setRating(0);
    setDescription('');
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    const ratingToEdit = ratings[index];
    setName(ratingToEdit.name);
    setRating(ratingToEdit.rating);
    setDescription(ratingToEdit.description);
  };

  const handleDelete = (index: number) => {
    setRatings(ratings.filter((_, i) => i !== index));
  };

  return (
    <div className="feedback-containerF">
      <Header activeTab={''} />
      <Navbar />
      <div className='feedcon'>
      <h1 className="feedback-title">Feedback and Rating</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-field">
          <label className="feedback-label" htmlFor="name">Name</label>
          <input
            className="feedback-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="feedback-field">
          <label className="feedback-label" htmlFor="rating">Rating</label>
          <select
            className="feedback-input"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="feedback-field">
          <label className="feedback-label" htmlFor="description">Description</label>
          <textarea
            className="feedback-input"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Link to="/displayfeedback"> <button className="feedback-submit" type="submit">
          {isEditing ? 'Update' : 'Submit'}
        </button></Link>
      </form>
      <h2 className="ratings-title">Ratings</h2>
      <ul className="ratings-list">
        {ratings.map((rating, index) => (
          <li key={index} className="rating-item">
            <div className="rating-header">
              <h3 className="rating-name">{rating.name}</h3>
              <div className="rating-actions">
                <button className="rating-edit" onClick={() => handleEdit(index)}>Edit</button>
                <button className="rating-delete" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
            <p className="rating-value">Rating: {rating.rating}</p>
            <p className="rating-description">{rating.description}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default FeedbackRatingPage;
