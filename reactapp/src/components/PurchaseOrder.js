import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseOrder() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    // Fetch purchase orders data from API
    fetchPurchaseOrders();
  }, []);
// GET
  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('/api/purchase');
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
      timestamp:new Date().toISOString()
    };
//POST
    try {
        await axios.post('/api/purchase', newPurchase);
        fetchPurchaseOrders();
        resetForm();
      } catch (error) {
        console.error(error);
      }
    };
//DELETE
    const handleDeleteProduct = async (productId) => {
        try {
          await axios.delete(`/api/products/${productId}`);
          fetchPurchaseOrders();
        } catch (error) {
          console.error(error);
        }
      };

      const resetForm = () => {
        setProductId(0);
        setQuantity(0);
        setSupplier('');
        setTimestamp('');
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
            <th>Supplier</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productId}</td>
              <td>{order.quantity}</td>
              <td>{order.supplier}</td>
              <td>{order.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    <div className='container w-50 justify-content-center'>
      <div className='row'>
        <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
          <h2 className='text-center m-4'>Purchase Order</h2>
          <form onSubmit={handleAddPurchase}>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Product ID
              </label>
              <input
                type="text"
                className='form-control'
                placeholder='Enter product name'
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                required
                name='productId' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Description' className='form-label'>
                Quantity
              </label>
              <input
                type="text"
                className='form-control'
                placeholder='Enter product description'
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                name='quantity' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Price' className='form-label'>
                Supplier
              </label>
              <input
                type="text"
                className='form-control'
                value={supplier}
                onChange={(event) => setSupplier(Number(event.target.value))}
                required
                name='supplier' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Quantity' className='form-label'>
                Timestamp
              </label>
              <input
              type="date"
              className='form-control'
              value={timestamp}
              onChange={(event) => setTimestamp(Number(event.target.value))}
              required
              name='timestamp' />
            </div>
          <center><button type="submit" className='btn btn-primary'>Add Purchase Order</button></center>
          </form>
        </div>
      </div>
    </div>


    </>
  );
}

export default PurchaseOrder;