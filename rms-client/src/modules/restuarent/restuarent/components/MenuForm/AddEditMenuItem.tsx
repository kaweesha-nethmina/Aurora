import React, { useState, useEffect } from 'react';
import { MenuItem as MenuItemType, addMenuItem, editMenuItem } from '../../services/addeditService';
import './addEditMenuItem.css';

const categories = [
  { value: 'food', label: 'Food' },
  { value: 'drink', label: 'Drink' },
];

interface AddEditMenuItemProps {
  menuItemToEdit?: MenuItemType;
  onSave: () => void;
}

const AddEditMenuItem: React.FC<AddEditMenuItemProps> = ({ menuItemToEdit, onSave }) => {
  const [menuItem, setMenuItem] = useState<MenuItemType>({
    name: '',
    price: 0,
    description: '',
    foodCode: '',
    category: 'food',
    image: '', // Updated field name
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (menuItemToEdit) {
      setMenuItem(menuItemToEdit);
      setIsEditing(true);
    }
  }, [menuItemToEdit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMenuItem((prev) => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImageFile(file); // Store the file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuItem((prev) => ({ ...prev, image: reader.result as string })); // Set the image preview
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleUploadImage = async (): Promise<string | null> => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Image upload failed');

        const data = await response.json();
        return data.imageUrl; // Return the uploaded image URL
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
        return null; // Return null on error
      }
    }
    return null; // Return null if no file to upload
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const uploadedImageUrl = await handleUploadImage(); // Upload the image before submitting
      if (uploadedImageUrl) {
        setMenuItem((prev) => ({ ...prev, image: uploadedImageUrl })); // Update the image URL if uploaded successfully
      }

      if (isEditing) {
        await editMenuItem(menuItem);
        alert('Menu item updated successfully!');
      } else {
        await addMenuItem(menuItem);
        alert('Menu item added successfully!');
      }
      onSave();
    } catch (error) {
      console.error('Error adding/updating menu item:', error);
      alert('Failed to add/update menu item. Please try again.');
    }
  };

  return (
    <div className="add-edit-menu-item">
      <h2>{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={menuItem.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={menuItem.price}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={menuItem.description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="foodCode">Food Code:</label>
          <input
            type="text"
            id="foodCode"
            name="foodCode"
            value={menuItem.foodCode}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={menuItem.category}
            onChange={handleInputChange}
            className="form-control"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
          {menuItem.image && <img src={menuItem.image} alt="Menu Item" className="image-preview" />}
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? 'Update' : 'Add'} Menu Item
        </button>
      </form>
    </div>
  );
};

export default AddEditMenuItem;