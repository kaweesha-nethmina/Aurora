const API_URL = 'http://localhost:5000/api/notices';

export const fetchNotices = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch notices');
  return response.json();
};

export const createNotice = async (notice: { title: string; description: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notice),
  });
  if (!response.ok) throw new Error('Failed to create notice');
  return response.json();
};

export const updateNotice = async (id: string, notice: any) => {
    const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notice),
    });
    if (!response.ok) {
      throw new Error('Failed to update notice');
    }
    return await response.json();
  };

export const deleteNotice = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete notice');
  return response.json();
};
