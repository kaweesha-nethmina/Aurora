import { useState } from 'react';
import '../HomePage/HomePage.css';
import { Link } from 'react-router-dom';
import Header from '../../../../core/components/Header';
import Navbar from './ResNavbar';

const MenuHomePage = () => {
  const [isBookNowClicked, setIsBookNowClicked] = useState(false);

  const handleBookNowClick = () => {
    setIsBookNowClicked(true);
  };

  return (
    <div className="homepage">
      <Header activeTab={'restaurant-bar'} />
      <Navbar />
      <div className="hero-section" >
        <div className="hero-content">
          <Link to="/form"> <button className="book-now-btn" onClick={handleBookNowClick}>
            Order Now
          </button></Link>
        </div>
      </div>

      {isBookNowClicked && (
        <div className="booking-confirmation">
          <p className="confirmation-text">Thank you for booking!</p>
        </div>
      )}

      <div className="content">
        <div className="card-container">
          <Link to="/menu"><div className="card">
            <img src="https://i.pinimg.com/564x/78/fe/fe/78fefe45bcdcf9d1709d993f0ac6985b.jpg" alt="Menu" className="card-image" />
            <h2 className="card-title">Menu</h2>
            <p className="card-description">Our menu features a wide variety of dishes, from classic favorites to innovative creations.</p>
          </div></Link> 
          <Link to="/aboutus"><div className="card">
            <img src="https://i.pinimg.com/564x/2d/d4/12/2dd4129c2ed74f4aff768baf81c82871.jpg" alt="About Us" className="card-image" />
            <h2 className="card-title">About Us</h2>
            <p className="card-description">Our restaurant is dedicated to providing a warm and welcoming atmosphere for all our guests.</p>
          </div></Link>
          <Link to="/drinks"><div className="card">
            <img src="https://i.pinimg.com/736x/d9/87/0e/d9870e364c4853ade88cd8091b7c0b9e.jpg" alt="Bar" className="card-image" />
            <h2 className="card-title">Bar</h2>
            <p className="card-description">Our bar features a wide selection of craft beers, wines, and cocktails, perfect for any occasion.</p>
          </div></Link>
        </div>
      </div>
    </div>
  );
};

export default MenuHomePage;
