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
      <button className="offer-card-button">Book Now</button>
    </div>
  );
};

export default OfferCard;
