import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarComp from "./NavbarComp";
import {FaEdit, FaTrash} from "react-icons/fa";
import {GrFormView} from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function ShipmentHome() {
  const [users, setUsers] = useState([]);
  const [query,setQuery]=useState('');
  

  useEffect(() => {
    fetchShipments();
  }, []);


  const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...users]; 

    switch (option) {
      case 'id':
        sortedOrders.sort((a, b) => a.id - b.id);
        break;
      case 'productId':
        sortedOrders.sort((a, b) => a.productId - b.productId);
        break;
      case 'quantity':
        sortedOrders.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'location':
        sortedOrders.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'timestamp':
        sortedOrders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      default:
        break;
    }
    setUsers(sortedOrders); 
  };

  const fetchShipments = async () => {
    const result = await axios.get("https://8080-ccafeabbdfaddeebcaddaceaeaadbdbabf.project.examly.io/shipment");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://8080-ccafeabbdfaddeebcaddaceaeaadbdbabf.project.examly.io/shipment/delete/${id}`);
    fetchShipments();
  };

  return (
    <>
    <NavbarComp />
    <div className="container">
      <div className="py-4">
        <div className="float-container">
          <div className="mb-3 d-flex justify-content-end" >
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
                  <li><button className='dropdown-item' onClick={() => handleSortBy('productId')}>Product ID</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('quantity')}>Quantity</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('location')}>Location</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('timestamp')}>Timestamp</button></li>
                </ul>
              </div>
      <Link className="btn btn-dark" to="/addshipment">
            Add Shipment Details
          </Link>
          </div>
          </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product_ID</th>
              <th scope="col">Quantity</th>
              <th scope="col">Location</th>
              <th scope="col">Timestamp</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {users.filter(
                  (order)=>order.id.toString().includes(query) ||
                  order.productId.toString().includes(query) ||
                  order.quantity.toString().includes(query) ||
                  order.location.toLowerCase().includes(query) ||
                  order.timestamp.toLowerCase().includes(query)
                  ).map((user, index) => {
                  return (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.productId}</td>
                <td>{user.quantity}</td>
                <td>{user.location}</td>
                <td>{user.timestamp}</td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/viewshipment/${user.id}`}
                  >
                    <GrFormView/>
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editshipment/${user.id}`}
                  >
                    <FaEdit/>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}