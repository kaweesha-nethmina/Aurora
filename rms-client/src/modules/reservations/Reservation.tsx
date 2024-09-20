import { useState, useEffect } from 'react';
import RoomCard from './components/RoomCard';
import RoomSearch from './components/RoomSearch';
import RoomFilter from './components/RoomFilter';
import useSearch from './hooks/useSearch';
import useFilter from './hooks/useFilter';
import './styles.css';
import Subheader from './components/Navbar';
import Header from '../core/components/Header';
import { fetchRooms, Room as RoomType } from './services/roomService'; // Adjust the import path as needed

const Reservation = () => {
  const { searchTerm, handleSearch } = useSearch();
  const { selectedType, handleFilter } = useFilter();
  const [filteredRooms, setFilteredRooms] = useState<RoomType[]>([]);
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      const rooms = await fetchRooms();
      setFilteredRooms(rooms);
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = filteredRooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedType) {
      filtered = filtered.filter((room) => room.type === selectedType);
    }
    setFilteredRooms(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedType]);

  const handleShowDetails = (id: string) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="containerRoom">
      <Header activeTab={''} />
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
