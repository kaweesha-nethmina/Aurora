import React, { useState, useEffect } from 'react';
import useDutyRoaster from '../../hooks/Manager/useDutyRoaster';
import '../../components/Manager/ManagerCss/DutyRoaster.css';

interface DutyRoasterEntry {
  _id: string;
  date: string;
  employeeName: string;
  shift: string;
}

const DutyRoasterTab: React.FC = () => {
  const { dutyRoaster, loading, error } = useDutyRoaster();
  const [filteredDutyRoaster, setFilteredDutyRoaster] = useState<DutyRoasterEntry[]>(dutyRoaster);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<DutyRoasterEntry>({
    _id: '',
    date: '',
    employeeName: '',
    shift: 'Morning',
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DutyRoasterEntry | null>(null);

  useEffect(() => {
    setFilteredDutyRoaster(
      dutyRoaster.filter(entry =>
        entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, dutyRoaster]);

  const handleUpdate = async () => {
    if (!selectedEntry) return;

    try {
      const response = await fetch(`http://localhost:5000/api/duty-roaster/${selectedEntry._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedEntry),
      });
      if (!response.ok) {
        throw new Error('Failed to update duty roaster');
      }
      const updatedEntry = await response.json();
      console.log('Entry updated:', updatedEntry);

      setFilteredDutyRoaster(prevDutyRoaster =>
        prevDutyRoaster.map(entry =>
          entry._id === updatedEntry._id ? updatedEntry : entry
        )
      );
      setShowUpdateForm(false);
      setSelectedEntry(null);
    } catch (error) {
      console.error('Error updating duty roaster:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/duty-roaster`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) {
        throw new Error('Failed to create duty roaster');
      }
      const createdEntry: DutyRoasterEntry = await response.json();
      setFilteredDutyRoaster((prevDutyRoaster: DutyRoasterEntry[]) => [...prevDutyRoaster, createdEntry]);
      setShowForm(false);
      setNewEntry({ _id: '', date: '', employeeName: '', shift: 'Morning' });
    } catch (error) {
      console.error('Error creating duty roaster:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/duty-roaster/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete duty roaster');
      }

      setFilteredDutyRoaster(prevDutyRoaster =>
        prevDutyRoaster.filter(entry => entry._id !== id)
      );
    } catch (error) {
      console.error('Error deleting duty roaster:', error);
    }
  };

  return (
    <div className="roaster-containerM">
      <h2 className="roaster-header">Duty Roaster</h2>
      <div className="search-container1">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input1"
        />
        <button
          className="search-button"
          onClick={() => setSearchQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      <button className="create-button" onClick={() => setShowForm(true)}>
        Create Duty Roaster
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowForm(false)}>&times;</span>
            <h3>Create New Duty Roaster</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Employee Name"
                value={newEntry.employeeName}
                onChange={(e) => setNewEntry({ ...newEntry, employeeName: e.target.value })}
                required
              />
              <select
                value={newEntry.shift}
                onChange={(e) => setNewEntry({ ...newEntry, shift: e.target.value })}
                className="shift-dropdown"
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
              <button type="submit" className="submit-button1">
                Create
              </button>
              <button type="button" className="cancel-button1" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showUpdateForm && selectedEntry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowUpdateForm(false)}>&times;</span>
            <h3>Update Duty Roaster</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}>
              <input
                type="text"
                value={selectedEntry.employeeName}
                onChange={(e) => setSelectedEntry({ ...selectedEntry, employeeName: e.target.value })}
                required
              />
              <select
                value={selectedEntry.shift}
                onChange={(e) => setSelectedEntry({ ...selectedEntry, shift: e.target.value })}
                className="shift-dropdown"
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
              <button type="submit" className="submit-button1">
                Update
              </button>
              <button type="button" className="cancel-button1" onClick={() => setShowUpdateForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table className="roaster-table">
        <thead>
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">Employee</th>
            <th className="table-header">Shift</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDutyRoaster.map((entry) => (
            <tr key={entry._id}>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.employeeName}</td>
              <td>{entry.shift}</td>
              <td>
                <button
                  className="view-button1"
                  onClick={() => {
                    setSelectedEntry(entry);
                    setShowUpdateForm(true);
                  }}
                >
                  View
                </button>
                <button
                  className="delete-button1"
                  onClick={() => handleDelete(entry._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DutyRoasterTab;
