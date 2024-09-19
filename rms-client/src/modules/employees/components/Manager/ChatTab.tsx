// src/modules/employees/components/Manager/ChatTab.tsx

import React, { useState, useEffect } from 'react';
import useChats from '../../hooks/Manager/useChats'; // Ensure this path is correct
import '../../components/Manager/ManagerCss/ChatTab.css'; // Adjust the path if needed

const ChatTab: React.FC = () => {
  const { chats, loading, error, setChats } = useChats(); // Call useChats hook
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: 'chat123', message: newMessage, employeeId: '66c78ea749736da77b2679cf' }) // Replace with dynamic employeeId if necessary
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const savedMessage = await response.json();
      setChats((prevChats) => [...prevChats, savedMessage]); // Update chat state
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chats/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      const result = await response.json();
      console.log(result);

      // Update chat state to remove deleted message
      setChats((prevChats) => prevChats.filter(chat => chat._id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <div className="chat-tab">
      <h2 className="chat-title">Chat</h2>
      <div className="chat-messages">
        {loading && <p>Loading...</p>}
        {error && <div className="error-message">{error}</div>}
        {chats.length > 0 ? (
          chats.map((msg) => (
            <div key={msg._id} className="chat-message">
              <button className="delete-button2" onClick={() => handleDelete(msg._id)}>
                🗑️
              </button>
              <div className="message-author">{msg.employeeId.name}:</div>
              <div className="message-text">{msg.message}</div>
            </div>
          ))
        ) : (
          <p>No chats available.</p>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatTab;
