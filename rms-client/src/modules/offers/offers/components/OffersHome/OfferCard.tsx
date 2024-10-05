import { useNavigate } from 'react-router-dom';
import '../OffersHome/OfferCard.css';

// Define the structure of your offer prop
interface OfferCardProps {
  offer: {
    price: string | number; // Ensure this is typed correctly
    id: number;
    name: string;
    description: string;
    image: string;
  };
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = () => {
    navigate('/FormBook', { state: { offer } }); // Pass state using navigate
  };

  return (
    <div className="offer-card">
      <img src={offer.image} alt={offer.name} className="offer-card-image" />
      <h2 className="offer-card-title">{offer.name}</h2>
      <p className="offer-card-description">{offer.description}</p>
      <p className="offer-card-price">Rs.{offer.price}</p>
      <button className="offer-card-button" onClick={handleClick}>
        Book Now
      </button>
    </div>
  );
};

export default OfferCard;
