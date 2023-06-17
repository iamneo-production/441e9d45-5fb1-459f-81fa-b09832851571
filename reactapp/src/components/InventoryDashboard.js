import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryDashboard = () => {
  const [inventoryLevels, setInventoryLevels] = useState([]);

  useEffect(() => {
    fetchInventoryLevels();
  }, []);

  const fetchInventoryLevels = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventoryLevels(response.data);
    } catch (error) {
      console.error('Error fetching inventory levels:', error);
    }
  };

  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {inventoryLevels.map((item) => (
            <tr key={item.id}>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;
