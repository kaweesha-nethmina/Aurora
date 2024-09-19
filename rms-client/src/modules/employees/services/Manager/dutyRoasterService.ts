const API_URL = 'http://localhost:5000/duty-roaster';

export const getDutyRoasters = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch duty roasters: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch duty roasters');
  }
};

export const createDutyRoaster = async (entry: { date: string; employeeName: string; shift: string }) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      throw new Error(`Failed to create duty roaster entry: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create duty roaster entry');
  }
};

export const updateDutyRoaster = async (id: string, entry: { date: string; employeeName: string; shift: string }) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      throw new Error(`Failed to update duty roaster entry: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update duty roaster entry');
  }
};

export const deleteDutyRoaster = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete duty roaster entry: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete duty roaster entry');
  }
};
