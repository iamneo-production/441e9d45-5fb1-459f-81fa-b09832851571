import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesTracker = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('/api/sales');
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <div>
      <h2>Sales Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.product_id}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTracker;
