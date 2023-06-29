import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [inventoryLevels, setInventoryLevels] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchInventoryLevels();
    fetchSalesData();
  }, []);

  const fetchInventoryLevels = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventoryLevels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('/api/sales');
      setSalesData(response.data);
      calculateRevenue(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateRevenue = (salesData) => {
    const totalRevenue = salesData.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
    setRevenue(totalRevenue);
  };

  return (
    <div>
      <h2>Reports</h2>
      <h3>Inventory Levels</h3>
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
          {inventoryLevels.map((inventory) => (
            <tr key={inventory.id}>
              <td>{inventory.id}</td>
              <td>{inventory.product_id}</td>
              <td>{inventory.quantity}</td>
              <td>{inventory.location}</td>
              <td>{inventory.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Sales Data</h3>
      <table className='table border shadow'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.product_id}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Revenue</h3>
      <p>Total Revenue: ${revenue.toFixed(2)}</p>
    </div>
  );
};

export default Reports;
