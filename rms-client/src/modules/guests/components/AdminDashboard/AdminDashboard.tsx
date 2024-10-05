import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './AdminDashboard.css';

interface Report {
  name: string;
  rating: number;
}

interface Feedback {
  _id: string;
  name: string;
  rating: number;
  feedback: string;
}

const AdminDashboard = () => {
  const [reports, setReports] = useState<Report[]>([
    { name: 'Positive', rating: 0 },
    { name: 'Negative', rating: 0 },
    { name: 'Neutral', rating: 0 },
  ]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Fetch feedback data from the backend
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

  // Function to print the report
  const printReport = async () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Admin Dashboard Report', 20, 20);
    doc.setFontSize(12);
    doc.text('Feedback Overview:', 20, 40);

    feedbacks.forEach((feedback, index) => {
      const yPosition = 50 + index * 10; // Adjust spacing between rows
      doc.text(`${feedback.name} - ${feedback.rating}/5`, 20, yPosition);
    });

    // Capture the chart section
    const chartSection = document.getElementById('chart-section');
    if (chartSection) {
      const canvas = await html2canvas(chartSection);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 20, 100, 160, 80); // Adjust position and size as necessary
    }

    doc.save('Admin_Dashboard_Report.pdf');
  };

  return (
    <div className="dashboard-containerGE">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <button className="dashboard-button" onClick={generateReports}>
        Generate Reports
      </button>
      <button className="dashboard-button" onClick={printReport}>
        Print Report
      </button>
      <div className="dashboard-flex">
        <div id="chart-section" className="dashboard-chart"> {/* Add ID here for capturing */}
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
          <h2 className="feedback-title">Feedback Overview</h2>
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback._id} className="feedback-itemR">
                <span className="feedback-ratingR">{feedback.name}</span> - {feedback.rating}/5
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
