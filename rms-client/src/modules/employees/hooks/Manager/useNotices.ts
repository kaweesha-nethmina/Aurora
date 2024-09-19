import { useState, useEffect } from 'react';

interface Notice {
  id: number;
  title: string;
  description: string;
}

const useNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notices');
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return { notices, loading, error };
};

export default useNotices;
