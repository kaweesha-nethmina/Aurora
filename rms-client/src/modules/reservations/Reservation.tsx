import { useState, useEffect } from 'react';
import RoomCard from './components/RoomCard';
import RoomSearch from './components/RoomSearch';
import RoomFilter from './components/RoomFilter';
import useSearch from './hooks/useSearch';
import useFilter from './hooks/useFilter';
import './styles.css';

import Subheader from './components/Navbar';

interface Room {
  id: number;
  name: string;
  price: number;
  rating: number;
  type: string;
  image: string;
  description: string;
}

// Room data
const rooms: Room[] = [
  {
    id: 1,
    name: 'Single Room',
    price: 100,
    rating: 4,
    type: 'single',
    image: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill',
    description: 'Our single rooms are perfect for solo travelers. They come with a comfortable single bed, a flat-screen TV, and a private bathroom.',
  },
  {
    id: 2,
    name: 'Double Room',
    price: 150,
    rating: 4.5,
    type: 'double',
    image: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103354-peninsula-shanghai-actual-river-room.jpg?q=w_3320,h_2041,x_0,y_0,c_fill/h_618',
    description: 'Our double rooms are ideal for couples. They come with a comfortable double bed, a flat-screen TV, and a private bathroom.',
  },
  {
    id: 3,
    name: 'Suite',
    price: 250,
    rating: 5,
    type: 'suite',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/483555414.jpg?k=aafd39f87bd5aecab9e5fa710013a16dfb747d8f50dfb6eb16b3647ab7d3ef00&o=&hp=1',
    description: 'Our suites are perfect for those who want to indulge in luxury. They come with a comfortable king-size bed, a flat-screen TV, and a private bathroom.',
  },
  {
    id: 4,
    name: 'Family Room',
    price: 200,
    rating: 4.5,
    type: 'family',
    image: 'https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906',
    description: 'Our family rooms are ideal for families. They come with a comfortable double bed and a single bed, a flat-screen TV, and a private bathroom.',
  },
  {
    id: 5,
    name: 'Deluxe Room',
    price: 300,
    rating: 5,
    type: 'deluxe',
    image: 'https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-new-delhi/room-and-suites/luxury-room/detail/luxury-room-1.jpg',
    description: 'Our deluxe rooms are perfect for those who want to experience the ultimate in luxury. They come with a comfortable king-size bed, a flat-screen TV, and a private bathroom.',
  },
];

const Reservation = () => {
  const { searchTerm, handleSearch } = useSearch();
  const { selectedType, handleFilter } = useFilter();
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

  const applyFilters = () => {
    let filtered = rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedType) {
      filtered = filtered.filter((room) => room.type === selectedType);
    }
    setFilteredRooms(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedType]);

  const handleShowDetails = (id: number) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container">
     
      <Subheader />
      <h1 className="title">Hotel Rooms</h1>
      <div className="controls">
        <RoomSearch searchTerm={searchTerm} onSearch={handleSearch} />
        <RoomFilter selectedType={selectedType} onFilter={handleFilter} />
      </div>
      <div className="room-grid">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onShowDetails={handleShowDetails}
            showDetails={showDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Reservation;
