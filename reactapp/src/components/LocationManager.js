import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addLocation = async () => {
    if (newLocation.trim() === '') return;
    try {
      const response = await axios.post('/api/locations', { name: newLocation });
      setLocations([...locations, response.data]);
      setNewLocation('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLocation = async (locationId) => {
    try {
      await axios.delete(`/api/locations/${locationId}`);
      setLocations(locations.filter((location) => location.id !== locationId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Location Manager</h2>
      <h3>Locations</h3>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name}{' '}
            <button onClick={() => deleteLocation(location.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Location</h3>
      <form onSubmit={addLocation}>
        <label>
          Location Name:
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </label>
        <button type="submit">Add Location</button>
      </form>
    </div>
  );
};

export default LocationManager;
