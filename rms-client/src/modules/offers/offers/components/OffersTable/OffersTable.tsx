import React, { useState, useEffect } from 'react';
import '../OffersTable/OffersTable.css';

interface Offer {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const OffersTable = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editing, setEditing] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
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

  const handleEdit = (offer: Offer) => {
    setEditing(true);
    setCurrentOffer(offer);
  };

  const handleSave = async () => {
    if (!currentOffer) return;

    const response = await fetch(`http://localhost:5000/api/offers/${currentOffer.id}`, {
      method: 'PUT',
      body: JSON.stringify(currentOffer),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedOffer = await response.json();
      setOffers(offers.map((o) => (o.id === updatedOffer.id ? updatedOffer : o)));
      alert('Offer updated successfully!');
    } else {
      alert('Failed to update offer.');
    }

    setEditing(false);
    setCurrentOffer(null);
  };

  const handleDelete = async (offer: Offer) => {
    if (window.confirm(`Are you sure you want to delete the offer "${offer.name}"?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/offers/${offer.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to delete offer');
        }

        setOffers(offers.filter((o) => o.id !== offer.id));
        alert('Offer deleted successfully!');
      } catch (error) {
        console.error('Error deleting offer:', error);
        alert('Failed to delete offer.');
      }
    }
  };

  const closeModal = () => {
    setEditing(false);
    setCurrentOffer(null);
  };

  if (loading) return <p>Loading offers...</p>;
  if (error) return <p>Error fetching offers: {error}</p>;

  return (
    <div className="offers-container">
      <h2 className="title">Available Offers</h2>
      <table className="offers-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Price</th>
            <th className="table-header">Description</th>
            <th className="table-header">Image</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="table-cell">{offer.name}</td>
              <td className="table-cell">${offer.price.toFixed(2)}</td>
              <td className="table-cell">{offer.description}</td>
              <td className="table-cell">
                <img src={offer.image} alt={offer.name} className="offer-image" />
              </td>
              <td className="table-cell">
                <button className="edit-button" onClick={() => handleEdit(offer)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(offer)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && currentOffer && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <span className="edit-close" onClick={closeModal}>&times;</span>
            <h2>Edit Offer</h2>
            <input
              type="text"
              value={currentOffer.name}
              onChange={(e) => setCurrentOffer({ ...currentOffer, name: e.target.value })}
              placeholder="Offer Name"
            />
            <input
              type="number"
              value={currentOffer.price}
              onChange={(e) => setCurrentOffer({ ...currentOffer, price: Number(e.target.value) })}
              placeholder="Price"
            />
            <textarea
              value={currentOffer.description}
              onChange={(e) => setCurrentOffer({ ...currentOffer, description: e.target.value })}
              placeholder="Description"
            />
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersTable;
