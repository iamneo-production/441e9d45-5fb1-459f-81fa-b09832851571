import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [barcode, setBarcode] = useState('');
  const [editProductID, setEditProductID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [query,setQuery]=useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...products]; 

    switch (option) {
      case 'name':
        sortedOrders.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'description':
        sortedOrders.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'quantity':
        sortedOrders.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'location':
        sortedOrders.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'price':
        sortedOrders.sort((a, b) => a.price-b.price);
        break;
      default:
        break;
    }
    setProducts(sortedOrders); 
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://8080-aabbafaeecebdfaddeebcaddaceaeaadbdbabf.project.examly.io/product');
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
      await axios.post('https://8080-aabbafaeecebdfaddeebcaddaceaeaadbdbabf.project.examly.io/product', newProduct);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log(productId);
      await axios.delete(`https://8080-aabbafaeecebdfaddeebcaddaceaeaadbdbabf.project.examly.io/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (productId) => {

    const order = products.find((order) => order.id === productId);
    
    if (order) {
    
      setEditProductID(productId);
      setPrice(order.price);
      setBarcode(order.barcode);
      setLocation(order.location);
      setQuantity(order.quantity);
      setDescription(order.description);
      setName(order.name);
      setShowForm(true);
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      
      quantity,
      location,
      price,
      description,
      barcode,
      name,
    };

    try {
      await axios.put(`https://8080-aabbafaeecebdfaddeebcaddaceaeaadbdbabf.project.examly.io/product/${editProductID}`, updatedProduct);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditProductID(null);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setLocation('');
    setBarcode('');
    setShowForm(false);
  };

  return (
    <>
    <NavbarComp />
    <div className='container'>
      <div className='py-4'>
      <div className='mb-3 d-flex justify-content-end'>
          <>
            {!showForm ? (
              <>
              <input
              type='text'
              className='search'
              placeholder='Search by name...'
              onChange={(event)=>setQuery(event.target.value.toLowerCase())}
              ></input>
              <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='sortByButton' data-bs-toggle='dropdown' aria-expanded='false'>
                  Sort By
                </button>
                <ul className='dropdown-menu' aria-labelledby='sortByButton'>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('name')}>Name</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('description')}>Description</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('quantity')}>Quantity</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('price')}>Price</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('location')}>Location</button></li>
                </ul>
              </div>
              
              <button type='button' className='btn btn-primary' onClick={() => setShowForm(true)}>
                Add New Product
              </button>
              </>
            ) : (
              <button type='button' className='btn btn-primary' onClick={resetForm}>
                Close form
              </button>
            )}
            </>
          </div>


      {!showForm &&( <table className='table border shadow'>
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
          {products.filter(
                  (product)=>
                  product.name.toLowerCase().includes(query)||
                  product.quantity.toString().includes(query) ||
                  product.price.toString().includes(query) ||
                  product.description.toLowerCase().includes(query) ||
                  product.location.toLowerCase().includes(query) ||
                  product.id.toString().includes(query)||
                  product.barcode.toLowerCase().includes(query)

                  ).map((product) => {
          
                return (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.location}</td>
              <td>{product.barcode}</td>
              <td>
              <button 
                        onClick={() => handleEdit(product.id)} 
                        title='Edit'
                        >
                        edit
                        </button>
                        {' '}
                <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        title='Delete'
                        >
                          delete
                        </button>
              </td>
            </tr>
        )}
        )}
        </tbody>
      </table>
      )}
      </div>
    </div>
    
    {showForm &&(
    <div className='container w-50 justify-content-center'>
      <div className='row'>
        <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
        <h2 className='text-center m-4'>{editProductID ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={editProductID ? handleUpdateProduct : handleAddProduct}>
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
                placeholder='Enter Price'
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
              placeholder='Enter Quanitity'
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
            placeholder='Enter Location'
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
            placeholder='Enter Barcode'
            value={barcode}
            onChange={(event) => setBarcode(event.target.value)}
            name='barcode'
            disabled={editProductID !== null}
            title='Cannot modify barcode'
          />
          </div>
          <center>
                  <button type='submit' className='btn btn-primary'>
                    {editProductID ? 'Update Product' : 'Add Product'}
                  </button>
                </center>
          </form>
        </div>
      </div>
    </div>
    )}

      </>
  );
};

export default ProductList;
