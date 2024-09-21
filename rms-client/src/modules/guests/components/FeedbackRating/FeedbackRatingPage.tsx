import React, { useState } from 'react';
import './FeedbackRatingPage.css';
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Rating {
  id: string; // MongoDB ObjectId
  name: string;
  rating: number;
  description: string;
}

const FeedbackRatingPage = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedbackData = { name, rating, description };

    try {
      const response = await axios.post<Rating>('http://localhost:5000/api/feedback', feedbackData);
      setRatings([...ratings, response.data]);
      
      // Navigate to /displayfeedback after submission
      navigate('/displayfeedback');
    } catch (error) {
      console.error('Error saving feedback:', error);
    }

    // Reset form
    setName('');
    setRating(0);
    setDescription('');
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
          <button className="feedback-submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackRatingPage;
