import { useState, useEffect } from 'react';
import OfferCard from './OfferCard';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import '../OffersHome/HomePage.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/ONavbar';

interface Offer {
  id: number;  // Change to string to match MongoDB ObjectId
  name: string;
  category: string;
  description: string;
  image: string;
}

const HomePage1 = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/offers');
        if (!response.ok) throw new Error('Failed to fetch offers');
        const data = await response.json();
        setOffers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter((offer) => {
    if (selectedCategory === 'All') {
      return offer.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return offer.category === selectedCategory && offer.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return <p>Loading offers...</p>;
  if (error) return <p>Error fetching offers: {error}</p>;

  return (
    <div className="homepage">
      <Header activeTab={''} />
      <Navbar />
      <div className="homepage-controls">
        <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="homepage-offers">
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default HomePage1;
