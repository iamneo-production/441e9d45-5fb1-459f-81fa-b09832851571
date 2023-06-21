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
      <h3 >Locations</h3>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name}{' '}
            <button onClick={() => deleteLocation(location.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-md-3 border rounded p-4 mt-2 shadow'>
      <h3 className='text-center m-4'>Add Location</h3>
      <form onSubmit={addLocation}>
      <div className='mb-3'>
        <label htmlFor='Location Name' className='form-label'>
          Location Name
          </label>
          <input
            type="text"
            className='form-control'
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </div>
       <center><button type="submit" className='btn btn-outline-primary'>Add Location</button></center> 
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default LocationManager;
