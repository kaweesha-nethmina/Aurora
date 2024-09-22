import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button/ButtonComponent';
import { useSelectedButton } from '../../../hooks/Employee/useSelectedButton';
import spaImage from '../../../images/HomePageSpa.jpeg';
import gymImage from '../../../images/HomePageGym.jpeg';
import medicalImage from '../../../images/HomePageMedical.jpeg';
import './HomePage.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/SNavbar';

const buttons = [
  { id: 1, label: 'Spa', image: spaImage, path: '/SpaPage' },
  { id: 2, label: 'Gym', image: gymImage, path: '/GymPage' },
  { id: 3, label: 'Medical', image: medicalImage, path: '/MedicalPage' },
];

const HomePage: React.FC = () => {
  const { selectedButton, handleButtonClick } = useSelectedButton();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="homepage-containerS">
      <Header activeTab={''} />
      <Navbar />
      <div className="button-wrapperS">
        {buttons.map((button) => (
          <div key={button.id} className="button-containerS">
            <ButtonComponent
              id={button.id}
              label={button.label}
              image={button.image} // Pass the image prop here
              isSelected={selectedButton === button.id}
              onClick={() => {
                handleButtonClick(button.id);
                handleNavigation(button.path);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
