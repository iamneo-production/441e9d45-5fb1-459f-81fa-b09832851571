import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewShipment() {
  const [user, setUser] = useState({
    productId: "",
    quantity: "",
    location: "",
    timestamp: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`https://8080-aedecebfbdffcfaddeebcaddacebceecbecadec.project.examly.io/shipment/get/${id}`);
    setUser(result.data);
  };

  return (
    <div className='container w-50 justify-content-center'>
    <div className='row'>
      <div className='container justify-content-center bg-dark col-md-8 border rounded p-4 mt-2 text-white'>
        <h2 className='text-center m-4'>Shipment Details</h2>

          <div className="card">
            <div className="card-header">
              Shipment Details: {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Product_ID: </b>
                  {user.productId}
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
          <center>
          <div style={{padding:"20px"}}>
          <Link className="btn btn-primary" to={"/shipment"}>
            Back to Shipment
          </Link>
          </div>
          </center>
        </div>
      </div>
    </div>
  );
}