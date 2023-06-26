import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewShipment() {
  const [user, setUser] = useState({
    productid: "",
    quantity: "",
    location: "",
    timestamp: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8081/shipments/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Shipment Details</h2>

          <div className="card">
            <div className="card-header">
              Shipment Details: {user.id}
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
                  <b>Location: </b>
                  {user.location}
                </li>
                <li className="list-group-item">
                  <b>Date: </b>
                  {user.timestamp}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-secondary" to={"/"}>
            Back to Shipment
          </Link>
        </div>
      </div>
    </div>
  );
}
