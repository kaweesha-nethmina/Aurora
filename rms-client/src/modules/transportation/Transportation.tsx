import { Link } from 'react-router-dom';
import './HomePage.css';
import Header from '../core/components/Header';
import Navbar from './components/TNavbar';


const HomePage = () => {
  return (
    
    <div className="homepage-container">
      <div className='nav'><Navbar /></div>
      <Header activeTab={'transportation'} />
      
      <h1 className="homepage-title">Book Your Vehicle</h1>
      <p className='para'>"Plan your ride with ease using our simple shuttle booking service. <br />Whether you're heading to the airport, a meeting, <br />or a special event, book your shuttle with just a few clicks. <br />Enjoy a hassle-free experience with reliable <br />transportation at your fingertips."</p>
      <Link to="/Tbform">
        <button className="homepage-button" onClick={() => console.log('Booking button clicked')}>
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
