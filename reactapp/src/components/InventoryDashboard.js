import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Inventory Dashboard</h2>
      {lowInventoryAlert && <p>Low Inventory Alert!</p>}
      <h3>Inventory</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Shipments</h3>
      <table>
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
      <h3>Receive Shipment</h3>
      <form onSubmit={handleReceiveShipment}>
        <label>
          Product ID:
          <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <button type="submit">Receive Shipment</button>
      </form>
    </div>
  );
};

export default InventoryDashboard;
