interface ButtonProps {
    id: number;
    label: string;
    image: string; // Image prop is required
    isSelected: boolean;
    onClick: () => void;
  }
  
  const ButtonComponent: React.FC<ButtonProps> = ({ id, label, image, isSelected, onClick }) => {
    return (
      <div className={`button ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <img src={image} alt={label} className="button-image" />
        <button>{label}</button>
      </div>
    );
  };
  
  export default ButtonComponent;
  