import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import NavbarComp from './NavbarComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faPencil,faTrashCan } from '@fortawesome/free-solid-svg-icons';


const SalesTracker = () => {
  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
      const response = await axios.get('https://8080-bdffaeaffaddeebcaddaceaeaadbdbabf.project.examly.io/sales/getall');
      setSales(response.data);
      calculateRevenue(response.data);
  };

  const deleteSales = async (id) => {
    await axios.delete(`https://8080-bdffaeaffaddeebcaddaceaeaadbdbabf.project.examly.io/sales/delete/${id}`);
    loadSales();
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
    <NavbarComp />
    <div className='container'>
      <div className='py-4'>
        <div className="float-container">
          <div className="float-contain" >
            <div className='mb-3 d-flex justify-content-end'>
              <Link className="btn btn-dark" to="/addsales">
               Add Sales Details
              </Link>
            </div>
          </div>
        </div>
        <table className='table border shadow'>
         <thead>
           <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Timestamp</th>
            <th>Action</th>
           </tr>
         </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.productid}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.timestamp}</td>
              <td>
                  <Link
                    className="btn"
                    to={`/viewsales/${sale.id}`}
                  >
                    
                    <FontAwesomeIcon icon={faEye}/>
                    
                   
                  </Link>
                  <Link
                    className="btn"
                    to={`/editsales/${sale.id}`}
                  >
                    <span style={{ color: "#fcc838" }}>
                    <FontAwesomeIcon icon={faPencil} />
                    </span>
                    
                  </Link>
                  <button
                    className="btn"
                    onClick={() => deleteSales(sale.id)}
                  >
                    <span style={{ color: "#f54040" }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                    
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='text-white'>Revenue: ${revenue}</h3>
      
    </div>
    </div>

    <div className='container w-50 justify-content-center'>
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
