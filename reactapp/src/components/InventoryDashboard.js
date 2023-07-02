import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [lowInventoryAlert, setLowInventoryAlert] = useState(false);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchInventory();
    fetchShipments();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventory(response.data);
      checkLowInventory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShipments = async () => {
    try {
      const response = await axios.get('/api/shipments');
      setShipments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkLowInventory = (inventoryData) => {
    const lowInventoryProducts = inventoryData.filter((product) => product.quantity < 10);
    setLowInventoryAlert(lowInventoryProducts.length > 0);
  };

  const handleReceiveShipment = async () => {
    const newShipment = {
      product_id: productId,
      quantity,
      location: 'Warehouse',
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post('/api/shipments', newShipment);
      fetchInventory();
      fetchShipments();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setProductId('');
    setQuantity(0);
  };

  return (
    <>
    <NavbarComp />
    <div className='container'>
    <div className='py-4'>
      <table className='table border shadow'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.product_id}</td>
              <td>{shipment.quantity}</td>
              <td>{shipment.location}</td>
              <td>{shipment.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>  
    
    
    <div className='container w-50 justify-content-center'>
      <div className='row'>
        <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
          <h3 className='text-center m-4'>Receive Inventory</h3>
          <form onSubmit={handleReceiveShipment}>
          <div className='mb-3'>
            <label htmlFor='Product ID' className='form-label'>
              Product ID
              </label>
              <input type="number" className='form-control' value={productId} onChange={(e) => setProductId(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor='Quantity' className='form-label'>
              Quantity
              </label>
              <input type="number" className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>    
          <div className='mb-3'>
            <label htmlFor='Location' className='form-label'>
              Location
              </label>
              <input type="number" className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor='Date' className='form-label'>
              Date
              </label>
              <input type="number" className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>

            <center><button type="submit" className='btn btn-primary'>Receive Inventory</button></center>
          </form>
          </div>
          </div>
    </div>
    
    </>
  );
};

export default InventoryDashboard;
