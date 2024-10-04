import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RoomFormState {
  roomId: string;
  roomType: string;
  price: number;
  rating: number;
  description: string;
  image?: File;
}

export const useRoomForm = () => {
  const [roomFormState, setRoomFormState] = useState<RoomFormState>({
    roomId: '',
    roomType: '',
    price: 0,
    rating: 1,
    description: '',
    image: undefined,
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoomFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRoomFormState((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('roomId', roomFormState.roomId);
    formData.append('roomType', roomFormState.roomType);
    formData.append('price', roomFormState.price.toString());
    formData.append('rating', roomFormState.rating.toString());
    formData.append('description', roomFormState.description);
    if (roomFormState.image) {
      formData.append('image', roomFormState.image);
    }

    try {
      await axios.post('http://localhost:5000/api/rooms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.alert('Room added successfully!');
      navigate('/roommanager/roomdetails'); // Redirect to RoomTable page
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Failed to add room:', error);
    }
  };

  return {
    roomFormState,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};
