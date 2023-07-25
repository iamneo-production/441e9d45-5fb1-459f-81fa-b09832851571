import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import NavbarComp from './NavbarComp';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GrFormView } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const SalesTracker = () => {
  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [query,setQuery]=useState('');

  useEffect(() => {
    loadSales();
  }, []);

  const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...sales]; 

    switch (option) {
      case 'id':
        sortedOrders.sort((a, b) => a.id - b.id);
        break;
      case 'productid':
        sortedOrders.sort((a, b) => a.productid - b.productid);
        break;
      case 'quantity':
        sortedOrders.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'price':
        sortedOrders.sort((a, b) => a.price - b.price);
        break;
      case 'productname':
        sortedOrders.sort((a, b) => a.productname.localeCompare(b.productname));
        break;
      case 'timestamp':
        sortedOrders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      default:
        break;
    }
    setSales(sortedOrders); 
  };

  const loadSales = async () => {
      const response = await axios.get('https://8080-ccafeabbdfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/getall');
      setSales(response.data);
      calculateRevenue(response.data);
  };

  const deleteSales = async (id) => {
    await axios.delete(`https://8080-ccafeabbdfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/delete/${id}`);
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
            <input
                  type='text'
                  className='search'
                  placeholder='Search order'
                  onChange={(event)=>setQuery(event.target.value.toLowerCase())}
                  ></input>
          <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='sortByButton' data-bs-toggle='dropdown' aria-expanded='false'>
                  Sort By
                </button>
                <ul className='dropdown-menu' aria-labelledby='sortByButton'>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('id')}>ID</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('productid')}>Product ID</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('productname')}>Product Name</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('quantity')}>Quantity</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('price')}>Price</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('timestamp')}>Timestamp</button></li>
                </ul>
              </div>
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
        {sales.filter(
                  (order)=>order.id.toString().includes(query) ||
                  order.productid.toString().includes(query) ||
                  order.quantity.toString().includes(query) ||
                  order.productname.toLowerCase().includes(query) ||
                  order.timestamp.toLowerCase().includes(query)
                  ).map((sale) => {
                  return (
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
                  <GrFormView/> 
                  </Link>
                  <Link
                    className="btn btn-light"
                    to={`/editsales/${sale.id}`}
                    
                  >
                  <FaEdit/>  
                  </Link>
                  <button
                    className="btn btn-light"
                    onClick={() => deleteSales(sale.id)}
                  >
                  <FaTrash/>
                  </button>
                </td>
            </tr>
          )})}
        </tbody>
      </table>
      <h3 className='text-white'>Revenue: ${revenue}</h3>
      
    </div>
    </div>

    
    
    </>
  );
};

export default SalesTracker;