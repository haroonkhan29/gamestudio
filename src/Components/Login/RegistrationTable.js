import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationTable = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('http://3.15.164.167:3001/user');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://3.15.164.167:3001/user/${id}`);
      fetchRegistrations();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Registration</h1>
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration, index) => (
            <tr key={index}>
              <td>{registration.firstname}</td>
              <td>{registration.lastname}</td>
              <td>{registration.username}</td>
              <td>{registration.email}</td>
              <td>{registration.type}</td>
              <td className="button-container">
                <button onClick={() => handleDelete(registration._id)}>
                <i className="fas fa-trash-alt" style={{ color: "white" }}></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;
