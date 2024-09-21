import React, { useState } from 'react';
import '../AddOffer/AddOffer.css';
import { Offer } from './types';


interface AddOfferProps {
  existingOffer?: Offer;
  onSave: (offer: Offer) => void;
}

const AddOffer: React.FC<AddOfferProps> = ({ existingOffer, onSave }) => {
  const [offer, setOffer] = useState<Offer>({
    name: existingOffer?.name || '',
    price: existingOffer?.price || 0,
    description: existingOffer?.description || '',
    image: null,
  });
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      price: '',
      description: '',
      image: '',
    };

    if (!offer.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!offer.price || offer.price <= 0) {
      newErrors.price = 'Price must be a positive number';
      isValid = false;
    }

    if (!offer.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!offer.image && !existingOffer?.image) {
      newErrors.image = 'Image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('name', offer.name);
      formData.append('price', offer.price.toString());
      formData.append('description', offer.description);
      if (offer.image) {
        formData.append('image', offer.image);
      }

      const url = existingOffer ? `http://localhost:5000/api/offers/${existingOffer.id}` : 'http://localhost:5000/api/offers';
      const method = existingOffer ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to save offer');
        }

        const savedOffer = await response.json();
        onSave(savedOffer);

        alert(existingOffer ? 'Offer updated successfully!' : 'Offer added successfully!');
        setOffer({ name: '', price: 0, description: '', image: null });
        setErrors({ name: '', price: '', description: '', image: '' });
      } catch (error) {
        console.error('Error saving offer:', error);
        alert('offer added to database.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOffer({ ...offer, image: e.target.files[0] });
    }
  };

  return (
    <div className="add-offer-container">
      <h2 className="add-offer-title">{existingOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            className="form-input"
            id="name"
            type="text"
            name="name"
            value={offer.name}
            onChange={handleInputChange}
            placeholder="Enter offer name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">Price</label>
          <input
            className="form-input"
            id="price"
            type="number"
            name="price"
            value={offer.price}
            onChange={handleInputChange}
            placeholder="Enter offer price"
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            className="form-input"
            id="description"
            name="description"
            value={offer.description}
            onChange={(e) => setOffer({ ...offer, description: e.target.value })}
            placeholder="Enter offer description"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="image">Image</label>
          <input
            className="form-input"
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>
        <button className="submit-button" type="submit">
          {existingOffer ? 'Update Offer' : 'Add Offer'}
        </button>
      </form>
    </div>
  );
};

export default AddOffer;
