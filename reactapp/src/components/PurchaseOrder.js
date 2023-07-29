import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';
import {FaEdit, FaTrash} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function PurchaseOrder() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [productId, setProductId] = useState('');
  const [supplier, setSupplier] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null); 
  const [query,setQuery]=useState('');

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...purchaseOrders]; 

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
      case 'supplier':
        sortedOrders.sort((a, b) => a.supplier.localeCompare(b.supplier));
        break;
      case 'timestamp':
        sortedOrders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      default:
        break;
    }
    setPurchaseOrders(sortedOrders); 
  };
  


  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('https://8080-acafbdefbcdaffaddeebcaddacebceecbecadec.project.examly.io/purchase-order');
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleAddPurchase = async (event) => {
    event.preventDefault();

    const newPurchase = {
      productId,
      quantity,
      supplier,
      timestamp: timestamp.toISOString(),
    };

    try {
      await axios.post('https://8080-acafbdefbcdaffaddeebcaddacebceecbecadec.project.examly.io/purchase-order', newPurchase);
      fetchPurchaseOrders();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (orderId) => {
    const order = purchaseOrders.find((order) => order.id === orderId);
    if (order) {
      setEditOrderId(orderId);
      setProductId(order.productId);
      setQuantity(order.quantity);
      setSupplier(order.supplier);
      setTimestamp(new Date(order.timestamp));
      setShowForm(true);
    }
  };

  const handleUpdatePurchase = async (event) => {
    event.preventDefault();

    const updatedPurchase = {
      productId,
      quantity,
      supplier,
      timestamp: timestamp.toISOString(),
    };

    try {
      await axios.put(`https://8080-acafbdefbcdaffaddeebcaddacebceecbecadec.project.examly.io/purchase-order/${editOrderId}`, updatedPurchase);
      fetchPurchaseOrders();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (orderId) => {
    try {
      await axios.delete(`https://8080-acafbdefbcdaffaddeebcaddacebceecbecadec.project.examly.io/purchase-order/${orderId}`);
      fetchPurchaseOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditOrderId(null);
    setProductId('');
    setQuantity('');
    setSupplier('');
    setTimestamp(new Date());
    setShowForm(false);
  };

  return (
    <>
      <NavbarComp />
      <div className='container'>
        <div className='py-4'>
          <div className='mb-3 d-flex justify-content-end'>
            {!showForm ? (
              <>
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
                  <li><button className='dropdown-item' onClick={() => handleSortBy('supplier')}>Supplier</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('timestamp')}>Timestamp</button></li>
                </ul>
              </div>
                
                <button type='button' className='btn btn-primary' onClick={() => setShowForm(true)}>
                  Add new purchase order
                </button>
              </>
            ) : (
              <button type='button' className='btn btn-primary' onClick={resetForm}>
                Close form
              </button>
            )}
          </div>
          {!showForm && (
            <table className='table border shadow'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Supplier</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.filter(
                  (order)=>order.id.toString().includes(query) ||
                  order.productId.toString().includes(query) ||
                  order.quantity.toString().includes(query) ||
                  order.supplier.toLowerCase().includes(query) ||
                  order.timestamp.toLowerCase().includes(query)
                  ).map((order) => {
                  return (
                      
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.productId}</td>
                    <td>{order.quantity}</td>
                    <td>{order.supplier}</td>
                    <td>{order.timestamp}</td>
                    <td>
                        <button onClick={() => handleEditProduct(order.id)} title='Edit'>
                          <FaEdit/>
                        </button>{' '}
                        <button onClick={() => handleDeleteProduct(order.id)} title='Delete'>
                         <FaTrash/>
                        </button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          )}
          {showForm && (
            <div className='container w-50 justify-content-center'>
              <div className='row'>
                <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
                  <h2 className='text-center m-4'>{editOrderId ? 'Edit Purchase Order' : 'Add Purchase Order'}</h2>
                  <form onSubmit={editOrderId ? handleUpdatePurchase : handleAddPurchase}>
                    <div className='mb-3'>
                      <label htmlFor='Name' className='form-label'>
                        Product ID
                      </label>
                      <input type='text'
                        className='form-control'
                        placeholder='Enter product id'
                        value={productId}
                        onChange={(event) => setProductId(event.target.value)}
                        required
                        name='productId'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='Description' className='form-label'>
                        Quantity
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter a value'
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                        name='quantity'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='Price' className='form-label'>
                        Supplier
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter the supplier'
                        value={supplier}
                        onChange={(event) => setSupplier(event.target.value)}
                        required
                        name='supplier'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='Quantity' className='form-label'>
                        Timestamp
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        value={timestamp.toISOString().split('T')[0]}
                        onChange={(event) => setTimestamp(new Date(event.target.value))}
                        required
                        name='timestamp'
                      />
                    </div>
                    <center>
                      <button type='submit' className='btn btn-primary'>
                        {editOrderId ? 'Update Purchase Order' : 'Add Purchase Order'}
                      </button>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PurchaseOrder;