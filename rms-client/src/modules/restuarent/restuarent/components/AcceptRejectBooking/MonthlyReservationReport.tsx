import React, { useState, useEffect } from 'react';
import './MonthlyReservationReport.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface MonthlyReservation {
  month: string; // E.g., 'January'
  year: number; // E.g., 2024
  count: number; // Number of reservations for that month
}

const MonthlyReservationReport: React.FC = () => {
  const [monthlyReservations, setMonthlyReservations] = useState<MonthlyReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/table-reservations');
        if (!response.ok) {
          throw new Error('Failed to fetch monthly reservations');
        }
        const data = await response.json();

        console.log('Fetched data:', data); // Log the fetched data

        // Process data to count reservations per month
        const counts: { [key: string]: { count: number; year: number } } = {};
        
        data.forEach((reservation: any) => {
          const date = new Date(reservation.arrivalDate); // Use arrivalDate instead of checkin
          
          // Check if the date is valid
          if (!isNaN(date.getTime())) {
            const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            
            // Initialize if not present
            if (!counts[monthYear]) {
              counts[monthYear] = { count: 0, year: date.getFullYear() }; // Store count and year
            }
            counts[monthYear].count += 1; // Increment count
          } else {
            console.warn('Invalid date:', reservation.arrivalDate); // Log any invalid dates
          }
        });

        // Convert counts object to an array
        const monthlyReport = Object.entries(counts).map(([month, { count, year }]) => ({
          month,
          count,
          year,
        }));

        console.log('Monthly Report:', monthlyReport); // Log the processed report
        setMonthlyReservations(monthlyReport);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReservations();
  }, []);

  const handlePrintToPDF = async () => {
    const input = document.getElementById('monthly-reservation-report');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Adjust as needed
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('monthly_reservation_report.pdf');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="monthly-reservation-container" id="monthly-reservation-report">
      <h1 className="monthly-reservation-heading">Monthly Reservation Report</h1>
      {monthlyReservations.length === 0 ? (
        <div className="no-reservations-message">No reservations available for this month.</div>
      ) : (
        <>
          
          <table className="monthly-reservation-table">
            <thead>
              <tr>
                <th className="table-header">Month</th>
                <th className="table-header">Year</th>
                <th className="table-header">Number of Reservations</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReservations.map((item, index) => (
                <tr key={index} className="table-row">
                  <td className="table-data">{item.month}</td>
                  <td className="table-data">{item.year}</td>
                  <td className="table-data">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="print-button" onClick={handlePrintToPDF}>Print to PDF</button>
        </>
      )}
    </div>
  );
};

export default MonthlyReservationReport;
