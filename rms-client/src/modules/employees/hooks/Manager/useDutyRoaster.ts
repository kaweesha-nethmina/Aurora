import { useState, useEffect } from 'react';

interface DutyRoasterEntry {
  _id: string;
  date: string;
  employeeName: string;
  shift: string;
}

const useDutyRoaster = () => {
  const [dutyRoaster, setDutyRoaster] = useState<DutyRoasterEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDutyRoaster = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/duty-roaster');
        if (!response.ok) {
          throw new Error('Failed to fetch duty roasters');
        }
        const data = await response.json();
        setDutyRoaster(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDutyRoaster();
  }, []);

  return { dutyRoaster, loading, error, setDutyRoaster };
};

export default useDutyRoaster;
