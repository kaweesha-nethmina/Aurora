import axios from 'axios';

interface RoomFormState {
  roomId: string;
  roomType: string;
  price: string;
  rating: string;
  description: string;
  image: File | null; // Updated type
}

const API_URL = 'http://localhost:5000/api/rooms';

export const addRoom = async (roomData: RoomFormState) => {
  const formData = new FormData();
  formData.append('roomId', roomData.roomId);
  formData.append('roomType', roomData.roomType);
  formData.append('price', roomData.price);
  formData.append('rating', roomData.rating);
  formData.append('description', roomData.description);
  if (roomData.image) {
    formData.append('image', roomData.image);
  }

  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getRooms = async () => {
  return axios.get(API_URL);
};

export const deleteRoom = async (roomId: string) => {
  return axios.delete(`${API_URL}/${roomId}`);
};

export const updateRoom = async (roomId: string, roomData: RoomFormState) => {
  const formData = new FormData();
  formData.append('roomType', roomData.roomType);
  formData.append('price', roomData.price);
  formData.append('rating', roomData.rating);
  formData.append('description', roomData.description);
  if (roomData.image) {
    formData.append('image', roomData.image);
  }

  return axios.put(`${API_URL}/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
