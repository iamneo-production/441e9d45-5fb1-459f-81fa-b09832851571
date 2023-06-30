import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleSubmit = async (event) => {
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
      await axios.post('/api/products', newProduct);
      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);
      setLocation('');
      setBarcode('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Barcode:
          <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
