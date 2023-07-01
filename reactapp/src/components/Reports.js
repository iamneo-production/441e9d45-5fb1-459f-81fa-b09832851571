import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Report.css';

const Reports = () => {
  const [inventoryLevels, setInventoryLevels] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchInventoryLevels();
    fetchSalesData();
  }, []);

  useEffect(() => {
    // Whenever the startDate or endDate changes, refetch the data with the new date range.
    if (startDate && endDate) {
     
      fetchSalesData();
    }
  }, [startDate, endDate]);

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
      const response = await axios.get('/api/sales', {
        params: {
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
        },
      });
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

      const handleSetDateRange = () => {
      // Call the fetch functions only if both start and end dates are selected
      if (startDate && endDate) { 
        fetchSalesData();
      }
    };
  
    return (
      <>
      <div className='container'>
      <div className='py-4'>
        <h3>Inventory Levels</h3>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th>SL.No.</th>
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
          </div>
        </div>
        <div className='container'>
          <div className='py-4'>
            <h3>Sales Data</h3>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
              <label>End Date:</label>
              <input
                type="date"
                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
              {/* Add a "Set" button to confirm the date range selection */}
              <button onClick={handleSetDateRange}>Set</button>
            </div>
            <table className='table border shadow'>
              <thead>
           <tr>
             <th>SL.No.</th>
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
        </div>
      </>
    );
  };
  
  export default Reports;
