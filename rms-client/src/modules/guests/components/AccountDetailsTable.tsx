import React, { useState } from 'react';
import './AccountDetailsTable.css';

interface Account {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const initialAccount: Account = {
  firstname: 'kavindu',
  lastname: 'Senanayake',
  email: 'gihankavindu123@gmail.com',
  password: 'password123',
};

const AccountDetailsTable = () => {
  const [account, setAccount] = useState(initialAccount);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAccount(initialAccount);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here if needed
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccount({ ...account, [name]: value });
  };

  return (
    <div className="account-details">
      <h2 className="title">Account Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <td className="label">Firstname</td>
            <td className="value">
              {isEditing ? (
                <input
                  type="text"
                  name="firstname"
                  value={account.firstname}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                account.firstname
              )}
            </td>
          </tr>
          <tr>
            <td className="label">Lastname</td>
            <td className="value">
              {isEditing ? (
                <input
                  type="text"
                  name="lastname"
                  value={account.lastname}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                account.lastname
              )}
            </td>
          </tr>
          <tr>
            <td className="label">Email</td>
            <td className="value">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={account.email}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                account.email
              )}
            </td>
          </tr>
          <tr>
            <td className="label">Password</td>
            <td className="value">
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={account.password}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                '********'
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        {isEditing ? (
          <>
            <button onClick={handleCancel} className="button cancel">
              Cancel
            </button>
            <button onClick={handleSave} className="button save">
              Save
            </button>
          </>
        ) : (
          <button onClick={handleEdit} className="button edit">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountDetailsTable;
