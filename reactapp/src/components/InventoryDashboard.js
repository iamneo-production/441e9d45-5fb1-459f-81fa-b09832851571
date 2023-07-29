import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';
import { ToastContainer,toast } from 'react-toastify';
import {FaEdit, FaTrash} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
const InventoryDashboard = () => {
  const [inventories, setInventory] = useState([]);
  const [productID, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());
  const [editInventoryID, setEditInventoryID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [query,setQuery]=useState('');

  useEffect(() => {
    fetchInventory();
  }, []);


  const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...inventories]; 

    switch (option) {
      case 'id':
        sortedOrders.sort((a, b) => a.id - b.id);
        break;
      case 'productId':
        sortedOrders.sort((a, b) => a.product.id - b.product.id);
        break;
      case 'quantity':
        sortedOrders.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'location':
        sortedOrders.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'timestamp':
        sortedOrders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      default:
        break;
    }
    setInventory(sortedOrders); 
  };

  const checkLowInventory = () => {
    inventories.forEach((inventory) => {
      if (inventory.quantity < 10) {
        const message = `Low inventory for product ID: ${inventory.id}`;
        toast.error(message);
      }
    });
  };
  
  const fetchInventory = async () => {
    try {
      const response = await axios.get('https://8080-decacabddcbafaddeebcaddaceaeaadbdbabf.project.examly.io/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleAddInventory = async (event) => {
    event.preventDefault();
    const newInventory = {
      product: {
        id: event.target.product_id.value || '',
      },
      quantity,
      location,
      timestamp: timestamp.toISOString(),
    };
    console.log("Hello");
    try {
      await axios.post('https://8080-decacabddcbafaddeebcaddaceaeaadbdbabf.project.examly.io/inventory', newInventory);
      fetchInventory();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (inventoryId) => {
    try {
      await axios.delete(`https://8080-decacabddcbafaddeebcaddaceaeaadbdbabf.project.examly.io/inventory/${inventoryId}`);
      fetchInventory();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (inventoryId) => {
    const order = inventories.find((value) => value.id === inventoryId);
    if (order) {
      setEditInventoryID(inventoryId);
      setProductId(order.product.id);
      setLocation(order.location);
      setQuantity(order.quantity);
      setTimestamp(new Date(order.timestamp));
      setShowForm(true);
    }
  };

  const handleUpdateInventory = async (event) => {
    event.preventDefault();

    const updatedInventory = {
      product: {
        id: productID,
      },
      quantity,
      location,
      timestamp: timestamp.toISOString(),
    };

    try {
      await axios.put(`https://8080-ccafeabbdfaddeebcaddaceaeaadbdbabf.project.examly.io/inventory/${editInventoryID}`, updatedInventory);
      fetchInventory();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditInventoryID(null);
    setProductId('');
    setQuantity('');
    setTimestamp(new Date());
    setShowForm(false);
  };

  return (
    <>
      <NavbarComp />
      <div className='container'>
        <div className='py-4'>
          <div className='mb-3 d-flex justify-content-end'>
          <>
          <button onClick={checkLowInventory} className='btn btn-primary'>Check Inventory Level</button>{'  '}
          
            {!showForm ? (
              <>
              <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='sortByButton' data-bs-toggle='dropdown' aria-expanded='false'>
                  Sort By
                </button>
                <ul className='dropdown-menu' aria-labelledby='sortByButton'>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('id')}>ID</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('productId')}>Product ID</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('quantity')}>Quantity</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('location')}>Location</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('timestamp')}>Timestamp</button></li>
                </ul>
              </div>
              <input
              type='text'
              className='search'
              placeholder='Search by location...'
              onChange={(event)=>setQuery(event.target.value)}
              ></input>
              <button type='button' className='btn btn-primary' onClick={() => setShowForm(true)}>
                Add new Inventory order
              </button>
              </>
            ) : (
              <button type='button' className='btn btn-primary' onClick={resetForm}>
                Close form
              </button>
            )}
            </>
          </div>
          {!showForm && (
            <table className='table border shadow'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventories.filter(
                  (inventory)=>inventory.location.toLowerCase().includes(query)
                  ).map((inventory) => {
          
                return (
                  <tr key={inventory.id}>
                    <td>{inventory.id}</td>
                    <td>{inventory.product && inventory.product.id}</td>
                    <td>{inventory.quantity}</td>
                    <td>{inventory.location}</td>
                    <td>{inventory.timestamp}</td>
                    <td>
                      <>
                        <button 
                        onClick={() => handleEdit(inventory.id)} 
                        title='Edit'
                        >
                          <FaEdit/>
                        </button>
                        {' '}
                        <button 
                        onClick={() => handleDelete(inventory.id)} 
                        title='Delete'>
                          <FaTrash/>
                        </button>
                      </>
                    </td>
                  </tr>
                )}
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <div className='container w-50 justify-content-center'>
          <div className='row'>
            <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
              <h2 className='text-center m-4'>{editInventoryID ? 'Edit Inventory Order' : 'Add Inventory Order'}</h2>
              <form onSubmit={editInventoryID ? handleUpdateInventory : handleAddInventory}>
                <div className='mb-3'>
                  <label className='form-label'>Product ID</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Enter the Product ID'
                    value={productID}
                    onChange={(event) => setProductId(event.target.value)}
                    name='product_id'
                    disabled={editInventoryID !== null} // Disable the input field for editing
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Quantity</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter the Quantity'
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    name='quantity'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Location</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter the Location'
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    name='location'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Timestamp</label>
                  <input
                    type='date'
                    className='form-control'
                    required
                    name='timestamp'
                    value={timestamp.toISOString().split('T')[0]}
                    onChange={(event) => setTimestamp(new Date(event.target.value))}
                  />
                </div>

                <center>
                  <button type='submit' className='btn btn-primary'>
                    {editInventoryID ? 'Update Inventory Order' : 'Add Inventory Order'}
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default InventoryDashboard;