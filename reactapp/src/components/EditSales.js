import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarComp from './NavbarComp';

export default function EditSales() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    productid: "",
    productname: "",
    quantity: "",
    price: "",
    timestamp: "",
  });

  const { productid, productname, quantity, price, timestamp } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://8080-ebffcebdfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/update`, user);
    navigate("/sales");
  };
 
  const loadUser = async () => {
    const result = await axios.get(`https://8080-ebffcebdfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/get/${id}`);
    setUser(result.data);
  };

  return (
    <>
    <NavbarComp />
    <div className="container w-50 p-4 justify-content-center">
      <div className="row">
        <div className="container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white">
          <h2 className="text-center m-4">Edit Sales Details</h2>

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
              <label htmlFor="Productname" className="form-label">
                Product name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product name"
                name="productname"
                value={productname}
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
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product price"
                name="price"
                value={price}
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
            <center>
            <button type="submit" className="btn btn-outline-success">
              Update
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/sales">
              Cancel
            </Link>
            </center>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}