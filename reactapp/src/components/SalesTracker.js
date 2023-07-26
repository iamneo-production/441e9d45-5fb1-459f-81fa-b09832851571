import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import NavbarComp from './NavbarComp';



const SalesTracker = () => {
  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
      const response = await axios.get('https://8080-aedecebfbdffcfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/getall');
      setSales(response.data);
      calculateRevenue(response.data);
  };

  const deleteSales = async (id) => {
    await axios.delete(`https://8080-aedecebfbdffcfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/delete/${id}`);
    loadSales();
  };

  const calculateRevenue = (salesData) => {
    const totalRevenue = salesData.reduce((total, sale) => total + sale.quantity * sale.price, 0);
    setRevenue(totalRevenue);
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
            <th>Product Name</th>
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
              <td>{sale.productname}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.timestamp}</td>
              <td>
                  <Link
                    className="btn btn-light"
                    to={`/viewsales/${sale.id}`}
                  >  
                  View 
                  </Link>
                  <Link
                    className="btn btn-light"
                    to={`/editsales/${sale.id}`}
                    
                  >
                    Edit  
                  </Link>
                  <button
                    className="btn btn-light"
                    onClick={() => deleteSales(sale.id)}
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='text-white'>Revenue: ${revenue}</h3>
      
    </div>
    </div>

    
    
    </>
  );
};

export default SalesTracker;