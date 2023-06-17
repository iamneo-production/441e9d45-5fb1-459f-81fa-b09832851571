import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const deleteLocation = async (locationId) => {
    try {
      await axios.delete(`/api/locations/${locationId}`);
      setLocations(locations.filter((location) => location.id !== locationId));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div>
      <h2>Location Manager</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>{location.contact}</td>
              <td>
                <button onClick={() => deleteLocation(location.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationManager;
