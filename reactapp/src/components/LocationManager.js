import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GrFormView } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const [query,setQuery]=useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const API_BASE_URL = 'https://8080-aedecebfbdffcfaddeebcaddacebceecbecadec.project.examly.io/';

  const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...locations]; 

    switch (option) {
      case 'name':
        sortedOrders.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'address':
        sortedOrders.sort((a, b) => a.address.localeCompare(b.address));
        break;
      case 'contact':
        sortedOrders.sort((a, b) => a.contact - b.contact);
        break;  
      default:
        break;
    }
    setLocations(sortedOrders); 
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/locations`);
      setLocations(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const locationData = {
      name: name,
      address: address,
      contact: contact
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/locations`, locationData);

      if (response.status === 201) {
        // Location created successfully, fetch the updated location list
        fetchLocations();
        // Reset form fields
        setName('');
        setAddress('');
        setContact('');
        // Hide the form after submission
        setShowForm(false);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/locations/${id}`);

      if (response.status === 204) {
        // Location deleted successfully, fetch the updated location list
        fetchLocations();
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = async (id) => {
    const editedLocation = locations.find((location) => location.id === id);

    const locationData = {
      name: editedLocation.name,
      address: editedLocation.address,
      contact: editedLocation.contact
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/locations/${id}`, locationData);

      if (response.status === 200) {
        // Location updated successfully, fetch the updated location list
        fetchLocations();
        // Clear the editing state
        setEditingId(null);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;

    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id ? { ...location, [name]: value } : location
      )
    );
  };

  const handleCancel = () => {
    setShowForm(false);
    setName('');
    setAddress('');
    setContact('');
  };

  return (
    <>
      <NavbarComp />

      {!showForm && (
        <div className='container'>
          <div className='py-4'>
            <div className='mb-3 d-flex justify-content-end'>
            <input
                  type='text'
                  className='search'
                  placeholder='Search order'
                  onChange={(event)=>setQuery(event.target.value.toLowerCase())}
                  ></input>
          <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='sortByButton' data-bs-toggle='dropdown' aria-expanded='false'>
                  Sort By
                </button>
                <ul className='dropdown-menu' aria-labelledby='sortByButton'>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('name')}>Name</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('address')}>Address</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('contact')}>Contact</button></li>
                </ul>
              </div>
              <button className='btn btn-primary' onClick={() => setShowForm(true)}>Add Location</button>
            </div>
            <table className='table border shadow'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {locations.filter(
                  (order)=>order.name.toLowerCase().includes(query) ||
                  order.address.toLowerCase().includes(query) ||
                  order.contact.toString().includes(query) 
                  ).map((location) => {
                  return (
                  <tr key={location.id}>
                    <td>
                      {editingId === location.id ? (
                        <input
                          type='text'
                          name='name'
                          value={location.name}
                          onChange={(e) => handleInputChange(e, location.id)}
                        />
                      ) : (
                        location.name
                      )}
                    </td>
                    <td>
                      {editingId === location.id ? (
                        <input
                          type='text'
                          name='address'
                          value={location.address}
                          onChange={(e) => handleInputChange(e, location.id)}
                        />
                      ) : (
                        location.address
                      )}
                    </td>
                    <td>
                      {editingId === location.id ? (
                        <input
                          type='text'
                          name='contact'
                          value={location.contact}
                          onChange={(e) => handleInputChange(e, location.id)}
                        />
                      ) : (
                        location.contact
                      )}
                    </td>
                    <td>
                      {editingId === location.id ? (
                        <div>
                          <button className='btn btn-primary' onClick={() => handleUpdate(location.id)}>Save</button>
                          <button className='btn btn-secondary' onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <button className='btn btn-info' onClick={() => handleEdit(location.id)}><FaEdit/></button>
                          <button className='btn btn-danger' onClick={() => handleDelete(location.id)}><FaTrash/></button>
                        </div>
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className='container w-50 justify-content-center'>
          <div className='row'>
            <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
              <h2 className='text-center m-4'>Add Location</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>
                    Name:
                    <input
                      className='form-control'
                      type='text'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
                <br />
                <div className='mb-3'>
                  <label className='form-label'>
                    Address:
                    <input
                      className='form-control'
                      type='text'
                      name='address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </label>
                </div>
                <br />
                <div className='mb-3'>
                  <label className='form-label'>
                    Contact:
                    <input
                      className='form-control'
                      type='text'
                      name='contact'
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </label>
                </div>
                <br />
                <div className='d-flex justify-content-between'>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                  <button type='button' className='btn btn-secondary' onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationManager;
