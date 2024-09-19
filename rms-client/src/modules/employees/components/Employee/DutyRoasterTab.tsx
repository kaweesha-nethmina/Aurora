import React, { useState, useEffect } from 'react';
import useDutyRoaster from '../../hooks/Manager/useDutyRoaster'; // Adjust the path if needed
import '../../components/Employee/DutyRoasterTab.css'; // Adjust the path if needed

interface DutyRoasterEntry {
  date: string;
  employeeName: string;
  shift: string;
}

const DutyRoasterTab: React.FC = () => {
  const { dutyRoaster, loading, error } = useDutyRoaster();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDutyRoaster, setFilteredDutyRoaster] = useState<DutyRoasterEntry[]>([]);

  useEffect(() => {
    setFilteredDutyRoaster(
      dutyRoaster.filter(entry =>
        entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, dutyRoaster]);

  return (
    <div className="roaster-container">
      <h2 className="roaster-header">Duty Roaster</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={() => setSearchQuery(searchQuery)}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table className="roaster-table">
        <thead>
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">Employee</th>
            <th className="table-header">Shift</th>
          </tr>
        </thead>
        <tbody>
          {filteredDutyRoaster.map((entry, index) => (
            <tr key={index}>
              <td>{new Date(entry.date).toLocaleDateString()}</td> {/* Format date */}
              <td>{entry.employeeName}</td>
              <td>{entry.shift}</td> {/* Display shift without dropdown */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DutyRoasterTab;
