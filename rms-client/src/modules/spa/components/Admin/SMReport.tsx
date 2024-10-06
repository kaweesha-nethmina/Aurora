import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import './SMReport.css'; // Import your CSS file for styling

interface Appointment {
  _id: string;
  doctor?: string; // Optional for spa appointments
  name: string;
  email: string;
  phone?: string; // Optional for spa appointments
  service?: string; // Optional for medical appointments
  date: string; // ISO format date string
  time: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'pending' | 'accepted' | 'rejected'; // Combine statuses
}

const SMReport: React.FC = () => {
  const [medicalAppointments, setMedicalAppointments] = useState<Appointment[]>([]);
  const [spaAppointments, setSpaAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const medicalResponse = await axios.get<Appointment[]>('http://localhost:5000/api/appointments');
        const spaResponse = await axios.get<Appointment[]>('http://localhost:5000/api/spaappointments');
        
        setMedicalAppointments(medicalResponse.data);
        setSpaAppointments(spaResponse.data);
      } catch (error) {
        setError('Failed to fetch appointments. Please try again.');
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filterByCurrentMonth = (appointments: Appointment[]) => {
    const currentMonth = new Date().getMonth(); // Get the current month (0-11)
    const currentYear = new Date().getFullYear(); // Get the current year

    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getMonth() === currentMonth && appointmentDate.getFullYear() === currentYear;
    });
  };

  // Generate reports
  const medicalReport = filterByCurrentMonth(medicalAppointments);
  const spaReport = filterByCurrentMonth(spaAppointments);

  // Count statistics
  const totalMedicalAppointments = medicalReport.length;
  const totalApprovedMedical = medicalReport.filter(a => a.status === 'Approved').length;
  const totalPendingMedical = medicalReport.filter(a => a.status === 'Pending').length;

  const totalSpaAppointments = spaReport.length;
  const totalAcceptedSpa = spaReport.filter(a => a.status === 'accepted').length;
  const totalPendingSpa = spaReport.filter(a => a.status === 'pending').length;

  if (loading) {
    return <div className="loading">Loading report...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Monthly Appointment Report', 20, 20);
    doc.setFontSize(12);
    doc.text('Report for: ' + new Date().toLocaleString('default', { month: 'long', year: 'numeric' }), 20, 30);
    
    // Medical appointments section
    doc.text('Medical Appointments', 20, 40);
    doc.text(`Total: ${totalMedicalAppointments}`, 20, 50);
    doc.text(`Approved: ${totalApprovedMedical}`, 20, 60);
    doc.text(`Pending: ${totalPendingMedical}`, 20, 70);

    // Spa appointments section
    doc.text('Spa Appointments', 20, 90);
    doc.text(`Total: ${totalSpaAppointments}`, 20, 100);
    doc.text(`Accepted: ${totalAcceptedSpa}`, 20, 110);
    doc.text(`Pending: ${totalPendingSpa}`, 20, 120);

    doc.save('Monthly_Appointment_Report.pdf');
  };

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>Monthly Appointment Report</h1>
        <h2>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      </header>
      <section className="report-section">
        <h3>Medical Appointments</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Total</th>
              <th>Approved</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalMedicalAppointments}</td>
              <td>{totalApprovedMedical}</td>
              <td>{totalPendingMedical}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="report-section">
        <h3>Spa Appointments</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Total</th>
              <th>Accepted</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalSpaAppointments}</td>
              <td>{totalAcceptedSpa}</td>
              <td>{totalPendingSpa}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <footer className="report-footer">
        <p>Generated on: {new Date().toLocaleDateString()}</p>
      </footer>
      <button onClick={generatePDF} className="print-button">Print to PDF</button>
    </div>
  );
};

export default SMReport;
