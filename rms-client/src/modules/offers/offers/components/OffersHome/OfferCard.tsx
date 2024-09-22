import { Link } from 'react-router-dom';
import '../OffersHome/OfferCard.css';

interface OfferCardProps {
  offer: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
}

const OfferCard = ({ offer }: OfferCardProps) => {
  return (
    <div className="offer-card">
      <img src={offer.image} alt={offer.name} className="offer-card-image" />
      <h2 className="offer-card-title">{offer.name}</h2>
      <p className="offer-card-description">{offer.description}</p>
      <Link to='/FormBook'><button className="offer-card-button">Book Now</button></Link> 
    </div>
  );
};

export default OfferCard;
