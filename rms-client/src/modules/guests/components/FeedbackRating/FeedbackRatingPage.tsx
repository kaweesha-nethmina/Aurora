import React, { useState } from 'react';
import './FeedbackRatingPage.css';
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Rating {
  _id: string; // MongoDB ObjectId
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
            <label className="feedback-label" htmlFor="name">Category</label>
            <select
              className="feedback-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            >
              <option value="select">Select</option>
              <option value="Event">Event</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Rooms">Rooms</option>
              <option value="Spa">Spa</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <div className="feedback-field">
      <label className="feedback-label" htmlFor="rating">Rating</label>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{
                  cursor: 'pointer',
                  color: ratingValue <= rating ? "#ffc107" : "#e4e5e9",
                  fontSize: "24px",
                }}
              >
                ★
          </span>
        );
      })}
    </div>
</div>

          <div className="feedback-field">
            <label className="feedback-label" htmlFor="description">Comment</label>
            <textarea
              className="feedback-input"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button className="feedback-submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackRatingPage;
