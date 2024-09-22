import React from 'react';

interface ButtonProps {
  id: number;
  label: string;
  image: string;
  isSelected: boolean;
  onClick: (id: number) => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ id, label, image, isSelected, onClick }) => {
  return (
    <div className="button-container">
      <img src={image} alt={label} className="button-image" />
      <button
        className={`button ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(id)}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonComponent;
