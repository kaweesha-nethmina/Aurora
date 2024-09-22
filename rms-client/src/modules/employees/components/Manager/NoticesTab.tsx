import React, { useState, useEffect } from 'react';
import { fetchNotices, createNotice, updateNotice, deleteNotice } from '../../services/Manager/noticeService';
import '../../components/Manager/ManagerCss/NoticesStyles.css';

const NoticesTab: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [newNotice, setNewNotice] = useState({ title: '', description: '' });
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setError('Failed to fetch notices');
      }
    };
    loadNotices();
  }, []);

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedNotice = await createNotice(newNotice);
      setNotices([...notices, addedNotice]);
      setNewNotice({ title: '', description: '' });
      alert('Notice added successfully!');
    } catch (error) {
      console.error('Failed to add notice:', error);
      setError('Failed to add notice');
      alert('Failed to add notice!');
    }
  };

  const handleUpdateNotice = async () => {
    if (editingNotice) {
      try {
        const updatedNotice = await updateNotice(editingNotice._id, editingNotice);
        setNotices(notices.map(notice => (notice._id === updatedNotice._id ? updatedNotice : notice)));
        setIsModalOpen(false);
        setEditingNotice(null);
        // Removed alert for update
      } catch (error) {
        console.error('Failed to update notice:', error);
        setError('Failed to update notice');
        alert('Failed to update notice!');
      }
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      await deleteNotice(id);
      setNotices(notices.filter(notice => notice._id !== id));
      alert('Notice deleted successfully!');
    } catch (error) {
      console.error('Failed to delete notice:', error);
      setError('Failed to delete notice');
      alert('Failed to delete notice!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingNotice((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="notices-containerM">
      
      
      {error && <p className="error-message">{error}</p>}

      <form className="add-notice-form" onSubmit={handleAddNotice}>
        <input
          type="text"
          name="title"
          value={newNotice.title}
          onChange={handleChange}
          placeholder="Notice Title"
          required
          className="notice-input"
        />
        <textarea
          name="description"
          value={newNotice.description}
          onChange={handleChange}
          placeholder="Notice Description"
          required
          className="notice-textarea"
        />
        <button type="submit" className="add-buttonN">Add Notice</button>
      </form>

      {/* Modal for editing notice */}
      {isModalOpen && editingNotice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Notice</h2>
            <input
              type="text"
              name="title"
              value={editingNotice.title}
              onChange={handleEditChange}
              placeholder="Edit Title"
              className="notice-input"
            />
            <textarea
              name="description"
              value={editingNotice.description}
              onChange={handleEditChange}
              placeholder="Edit Description"
              className="notice-textarea"
            />
            <div className="modal-actions">
              <button onClick={handleUpdateNotice} className="modal-saveN">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="modal-cancelN">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {notices.length === 0 ? (
        <p>No notices available</p>
      ) : (
        <ul className="notices-list">
          {notices.map(notice => (
            <li key={notice._id} className="notice-item">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-description">{notice.description}</p>
              <button className="edit-buttonN" onClick={() => {
                setEditingNotice(notice);
                setIsModalOpen(true);
              }}>Edit</button>
              <button className="delete-buttonN" onClick={() => handleDeleteNotice(notice._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoticesTab;
