// src/hooks/Manager/useChats.ts

import { useState, useEffect } from 'react';

const useChats = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chats');
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError('No chats available.');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return { chats, loading, error, setChats };
};

export default useChats;
