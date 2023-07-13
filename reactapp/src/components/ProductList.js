import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      description,
      price,
      quantity,
      location,
      barcode,
    };

    try {
      await axios.post('http://localhost:8080/product', newProduct);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice(0);
    setQuantity(0);
    setLocation('');
    setBarcode('');
  };

  return (
    <>
    <NavbarComp />
    <div className='container'>
      <div className='py-4'>
      <table className='table border shadow'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Barcode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.location}</td>
              <td>{product.barcode}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    {/* col-md-8 offset-md-3 border rounded p-4 mt-2 shadow */}
    <div className='container w-50 justify-content-center'>
      <div className='row'>
        <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
          <h2 className='text-center m-4'>Product List</h2>
          <form onSubmit={handleAddProduct}>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Name
              </label>
              <input
                type="text"
                className='form-control'
                placeholder='Enter product name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                name='name' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Description' className='form-label'>
                Description
              </label>
              <input
                type="text"
                className='form-control'
                placeholder='Enter product description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                name='description' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Price' className='form-label'>
                Price
              </label>
              <input
                type="number"
                className='form-control'
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                required
                name='price' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Quantity' className='form-label'>
                Quantity
              </label>
              <input
              type="number"
              className='form-control'
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              required
              name='quantity' />
            </div>
            <div className='mb-3'>
              <label htmlFor='Location' className='form-label'>
                Location
              </label>
              <input
            type="text"
            className='form-control'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            name='location'
          />
          </div>
          <div className='mb-3'>
              <label htmlFor='Barcode' className='form-label'>
                Barcode
              </label>
              <input
            type="text"
            className='form-control'
            value={barcode}
            onChange={(event) => setBarcode(event.target.value)}
            name='barcode'
          />
          </div>
          <center><button type="submit" className='btn btn-primary'>Add Product</button></center>
          </form>
        </div>
      </div>
    </div>


      </>
  );
};

export default ProductList;
