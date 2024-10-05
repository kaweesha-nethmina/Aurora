import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import './Form.css';
import Header from '../../../../core/components/Header';

// Define the structure of your form values
interface FormValues {
  fullName: string;
  phoneNumber: string;
  offerName: string;
  offerPrice: string;
  date: string;
  description: string;
  nic: string;
}

const Form = () => {
  const location = useLocation();
  const { offer } = location.state || {};

  const { formValues, errors, handleChange, handleSubmit, setFormValues, submissionStatus } = useForm(); 

  // Retrieve user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userProfile = JSON.parse(userData);
      setFormValues((prevValues: FormValues) => ({
        ...prevValues,
        fullName: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`,
        phoneNumber: userProfile.phone || '',
      }));
    }

    if (offer) {
      setFormValues((prevValues: FormValues) => ({
        ...prevValues,
        offerName: offer.name || '',
        offerPrice: offer.price || '',
        description: offer.description || '',
      }));
    }
  }, [offer, setFormValues]);

  return (
    <div className="form-containerOf">
      <Header activeTab={'offers'} />
      <h2 className="form-title">{offer ? offer.name : 'Spa Day'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            className={`form-input ${errors.phoneNumber ? 'form-input-error' : ''}`}
          />
          {errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="offerName">Offer Name</label>
          <input
            type="text"
            id="offerName"
            name="offerName"
            value={formValues.offerName}
            onChange={handleChange}
            className={`form-input ${errors.offerName ? 'form-input-error' : ''}`}
            readOnly
          />
          {errors.offerName && <p className="form-error">{errors.offerName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="offerPrice">Price</label>
          <input
            type="text"
            id="offerPrice"
            name="offerPrice"
            value={formValues.offerPrice}
            onChange={handleChange}
            className={`form-input ${errors.offerPrice ? 'form-input-error' : ''}`}
            readOnly
          />
          {errors.offerPrice && <p className="form-error">{errors.offerPrice}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            className={`form-input ${errors.date ? 'form-input-error' : ''}`}
          />
          {errors.date && <p className="form-error">{errors.date}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            className={`form-input ${errors.description ? 'form-input-error' : ''}`}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        <button className="form-button" type="submit">Book</button>
      </form>

      {/* Display submission status */}
      {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
    </div>
  );
};

export default Form;
