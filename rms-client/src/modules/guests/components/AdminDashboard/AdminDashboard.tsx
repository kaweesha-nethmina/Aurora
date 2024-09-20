import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './AdminDashboard.css';

interface Feedback {
  id: number;
  rating: number;
  feedback: string;
}

interface Report {
  name: string;
  rating: number;
}

const AdminDashboard = () => {
  const [feedbacks] = useState<Feedback[]>([
    { id: 1, rating: 5, feedback: 'Great experience' },
    { id: 2, rating: 4, feedback: 'Good experience' },
    { id: 3, rating: 3, feedback: 'Average experience' },
    { id: 4, rating: 2, feedback: 'Bad experience' },
    { id: 5, rating: 1, feedback: 'Worst experience' },
  ]);

  const [reports, setReports] = useState<Report[]>([
    { name: 'Positive', rating: 0 },
    { name: 'Negative', rating: 0 },
    { name: 'Neutral', rating: 0 },
  ]);

  const generateReports = () => {
    let positive = 0;
    let negative = 0;
    let neutral = 0;

    feedbacks.forEach((feedback) => {
      if (feedback.rating >= 4) {
        positive++;
      } else if (feedback.rating <= 2) {
        negative++;
      } else {
        neutral++;
      }
    });

    setReports([
      { name: 'Positive', rating: positive },
      { name: 'Negative', rating: negative },
      { name: 'Neutral', rating: neutral },
    ]);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <button className="dashboard-button" onClick={generateReports}>
        Generate Reports
      </button>
      <div className="dashboard-flex">
        <div className="dashboard-chart">
          <LineChart
            width={500}
            height={300}
            data={reports}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className="dashboard-feedback">
          <h2 className="feedback-title">Feedbacks</h2>
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback.id} className="feedback-item">
                <span className="feedback-rating">{feedback.rating}/5</span> - {feedback.feedback}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
