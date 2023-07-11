import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewSales() {
  const [user, setUser] = useState({
    productid: "",
    quantity: "",
    price: "",
    timestamp: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`https://8080-bdffaeaffaddeebcaddaceaeaadbdbabf.project.examly.io/get/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
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
          <Link className="btn btn-secondary" to={"/"}>
            Back to Sales
          </Link>
        </div>
      </div>
    </div>
  );
}