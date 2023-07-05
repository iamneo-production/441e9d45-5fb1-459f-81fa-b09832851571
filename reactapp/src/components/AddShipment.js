import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarComp from "./NavbarComp";

export default function AddShipment() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    productid: "",
    quantity: "",
    location: "",
    timestamp: new Date().toISOString(),
    
  });

  const { productid, quantity, location, timestamp } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/api/post", user);
    navigate("/shipment");
  };

  return (
    
    <>    
    <div className='container w-50 justify-content-center'>

    <div className='row'>
      <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
        <h2 className='text-center m-4'>Shipment Details Entry</h2>

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
                Timestamp
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
            <div>
            <center>
            <button type="submit" className="btn btn-primary" style={{margin:"10px"}}>
              Place Order
            </button>
            <Link className="btn btn-danger" to="/shipment">
              Cancel
            </Link>
            </center>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
