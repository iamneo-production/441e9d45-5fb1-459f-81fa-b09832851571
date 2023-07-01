import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
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
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="container bg-dark p-3 border rounded">
          <h2 className="mt-4 text-white">Add Location</h2>
          <div className="input-group mb-3">

            <ul>
              {locations.map((location) => (
                <li key={location.id}>
                  {location.name}{' '}
                  <button onClick={() => deleteLocation(location.id)}>Delete</button>
                </li>
              ))}
            </ul>
            <div className="float-container">
            <form onSubmit={addLocation}>
              <div className="float-location">
              <input
                type="text"
                placeholder="Add Location"
                className='form-control'
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              </div>

            <div className="float-location">
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">Add Location</button>
            </div>
            </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationManager;
