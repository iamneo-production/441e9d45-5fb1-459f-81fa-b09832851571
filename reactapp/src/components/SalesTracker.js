import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesTracker = () => {
  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('/api/sales');
      setSales(response.data);
      calculateRevenue(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateRevenue = (salesData) => {
    const totalRevenue = salesData.reduce((total, sale) => total + sale.quantity * sale.price, 0);
    setRevenue(totalRevenue);
  };

  const generateReport = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/reports?start_date=${startDate}&end_date=${endDate}`);
      // Process the report data or display it on the page
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sales Tracker</h2>
      <h3>Sales</h3>
      <table>
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
          {sales.map((sale) => (
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
      <h3>Revenue: ${revenue}</h3>
      <h3>Generate Report</h3>
      <form onSubmit={generateReport}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button type="submit">Generate Report</button>
      </form>
    </div>
  );
};

export default SalesTracker;
