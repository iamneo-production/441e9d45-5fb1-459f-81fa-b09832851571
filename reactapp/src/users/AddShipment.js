import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddShipment() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    productid: "",
    quantity: "",
    location: "",
    timestamp: "",
    
  });

  const { productid, quantity, location, timestamp } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/postshipment", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Shipment Details Entry</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Product_ID" className="form-label">
                Product_ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your productid"
                name="productid"
                value={productid}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your location"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Timestamp" className="form-label">
                Date
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your date"
                name="timestamp"
                value={timestamp}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
       
            <button type="submit" className="btn btn-outline-success">
              Place Order
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
