import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import '../DailyReport/DailyReport.css';

interface ReportData {
  name: string;
  quantity: number;
}

const DailyReportGenerationForm = () => {
  const [data, setData] = useState<ReportData[]>([
    { name: 'Event', quantity: Math.floor(Math.random() * 6) },
    { name: 'Spa', quantity: Math.floor(Math.random() * 6) },
    { name: 'Restaurant', quantity: Math.floor(Math.random() * 6) },
    { name: 'Packages', quantity: Math.floor(Math.random() * 6) },
  ]);

  const [generated, setGenerated] = useState(false);

  const handleReportGeneration = () => {
    setGenerated(true);
  };

  const handleSaveAsPdf = async () => {
    const chartElement = document.getElementById('chart');
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const dataURL = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(dataURL, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataURL, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('daily-report.pdf');
    }
  };

  return (
    <div className="report-containerw">
      <h1 className="report-title">Daily Report Generation Form</h1>
      <button className="btn-report" onClick={handleReportGeneration}>
        Report Generate
      </button>
      {generated && (
        <div>
          <BarChart width={500} height={300} data={data} id="chart" className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
          <button className="btn-save" onClick={handleSaveAsPdf}>
            Save as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyReportGenerationForm;
