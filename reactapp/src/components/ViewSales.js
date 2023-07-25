import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarComp from './NavbarComp';

export default function ViewSales() {
  const [user, setUser] = useState({
    productid: "",
    productname: "",
    quantity: "",
    price: "",
    timestamp: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`https://8080-ccafeabbdfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/get/${id}`);
    setUser(result.data);
  };

  return (
    <>
    <NavbarComp />
    <div className="container w-50 p-4 justify-content-center">
      <div className="row">
        <div className="container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white">
          <h2 className="text-center m-4">Sales Details</h2>

          <div className="card">
            <div className="card-header">
              Sales Details: {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Product_ID: </b>
                  {user.productid}
                </li>
                <li className="list-group-item">
                  <b>Product Name: </b>
                  {user.productname}
                </li>
                <li className="list-group-item">
                  <b>Quantity: </b>
                  {user.quantity}
                </li>
                <li className="list-group-item">
                  <b>Price: </b>
                  {user.price}
                </li>
                <li className="list-group-item">
                  <b>Date: </b>
                  {user.timestamp}
                </li>
              </ul>
            </div>
          </div>
          <center>
          <Link className="btn btn-secondary mb-2 m-4" to={"/sales"}>
            Back to Sales
          </Link>
          </center>
        </div>
      </div>
    </div>
    </>
  );
}