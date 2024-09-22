import { useState, useEffect } from 'react';
import RoomCard from './components/RoomCard';
import RoomSearch from './components/RoomSearch';
// import RoomFilter from './components/RoomFilter';
import useSearch from './hooks/useSearch';
import useFilter from './hooks/useFilter';
import './styles.css';
import Subheader from './components/Navbar';
import Header from '../core/components/Header';
import { fetchRooms, Room as RoomType } from './services/roomService'; // Adjust the import path as needed

const Reservation = () => {
  const { searchTerm, handleSearch } = useSearch();
  const { selectedType } = useFilter();
  const [rooms, setRooms] = useState<RoomType[]>([]); // Store all rooms fetched from the API
  const [filteredRooms, setFilteredRooms] = useState<RoomType[]>([]); // Store rooms after filtering
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});

  // Fetch room data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const roomsData = await fetchRooms();
      setRooms(roomsData); // Store fetched rooms
      setFilteredRooms(roomsData); // Initialize filtered rooms with all fetched rooms
    };
    fetchData();
  }, []);

  // Apply filters and search whenever searchTerm or selectedType changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedType]);

  const applyFilters = () => {
    let filtered = rooms.filter((room) =>
      room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedType) {
      filtered = filtered.filter((room) => room.roomType === selectedType);
    }
    setFilteredRooms(filtered); // Update the filtered rooms list
  };

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
        {/* <RoomFilter selectedType={selectedType} onFilter={handleFilter} /> */}
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
