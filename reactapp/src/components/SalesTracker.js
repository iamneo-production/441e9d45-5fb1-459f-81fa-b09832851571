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
    <>
    <div className='container'>
      <div className='py-4'>
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
      <h3 className='text-white'>Revenue: ${revenue}</h3>
      
    </div>
    </div>

    <div className='container w-50 justify-content-center' style={{height:'100vh'}}>
      <div className='row'>
        
        <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
        
          <h3 className='text-center m-4'>Generate Report</h3>
          <form onSubmit={generateReport}>
          <div className='mb-3'>
          <label htmlFor='Product ID' className='form-label'>
          Start Date
          </label>
          <input type="date" className='form-control' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='mb-3'>
          <label htmlFor='Product ID' className='form-label'>
          End Date
          </label>
          <input type="date" className='form-control' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <center><button type="submit" className='btn btn-primary'>Generate Report</button></center>
      </form>
      </div>
      </div>
    </div>
    
    </>
  );
};

export default SalesTracker;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SalesTracker = () => {
//   const [sales, setSales] = useState([]);
//   const [revenue, setRevenue] = useState(0);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const fetchSales = async () => {
//     try {
//       const response = await axios.get('/api/sales');
//       setSales(response.data);
//       calculateRevenue(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const calculateRevenue = (salesData) => {
//     const totalRevenue = salesData.reduce((total, sale) => total + sale.quantity * sale.price, 0);
//     setRevenue(totalRevenue);
//   };

//   const generateReport = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`/api/reports?start_date=${startDate}&end_date=${endDate}`);
//       // Process the report data or display it on the page
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sales Tracker</h2>
//       <h3>Sales</h3>
//       <table className='table border shadow'>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Product ID</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Timestamp</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map((sale) => (
//             <tr key={sale.id}>
//               <td>{sale.id}</td>
//               <td>{sale.product_id}</td>
//               <td>{sale.quantity}</td>
//               <td>{sale.price}</td>
//               <td>{sale.timestamp}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h3>Revenue: ${revenue}</h3>
//       <div className='container'>
//         <div className='row'>
//           <div className='col-md-8 offset-md-3 border rounded p-4 mt-2 shadow'>
//       <h3 className='text-center m-4'>Generate Report</h3>
//       <form onSubmit={generateReport}>
//       <div className='mb-3'>
//         <label htmlFor='Product ID' className='form-label'>
//           Start Date
//           </label>
//           <input type="date" className='form-control' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         </div>
//         <div className='mb-3'>
//         <label htmlFor='Product ID' className='form-label'>
//           End Date
//           </label>
//           <input type="date" className='form-control' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         </div>
//         <center><button type="submit" className='btn btn-outline-primary'>Generate Report</button></center>
//       </form>
//       </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default SalesTracker;
