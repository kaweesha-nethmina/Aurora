import Header from '../../../../core/components/Header';
import Navbar from '../nav/SNavbar';
import './GymPage.css';
import yoga from '../../../images/YOGA.avif';
import cardio from '../../../images/CARDIO.jpg';
import fitness from '../../../images/Strength.jpg';
const GymPage = () => {
  return (
    <div className="spaContainer">
      <Header activeTab={'spa-wellness'} />
      <Navbar />
      
      <div className="">
        <div className="bg-gray-100 rounded shadow-md p-4">
        <h3 className="titleG">Yoga</h3>
          <p className="text">
            Improve flexibility, balance, and strength with our yoga program.
          </p>
          <img
            src={yoga}
            alt="Yoga"
            className="yoga"
          />
          
        </div>
        <div className="bg-gray-100 rounded shadow-md p-4">
        <h3 className="titleG">Cardio</h3>
          <p className="text">
            Get your heart rate up and burn calories with our cardio program.
          </p>
          <img
            src={cardio}
            alt="Cardio"
            className="yoga"
          />
          
        </div>
        <div className="bg-gray-100 rounded shadow-md p-4">
        <h3 className="titleG">Strength Training</h3>
          <p className="text">
            Build muscle and increase strength with our strength training program.
          </p>
          <img
            src={fitness}
            alt="Strength Training"
            className="fit"
          />
          
        </div>
      </div>
    </div>
  );
};

export default GymPage;
