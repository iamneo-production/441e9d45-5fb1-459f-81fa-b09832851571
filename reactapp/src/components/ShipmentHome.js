import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarComp from "./NavbarComp";

export default function ShipmentHome() {
  const [users, setUsers] = useState([]);

  

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    const result = await axios.get("http://localhost:8081/api/getall");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8081/api/delete/${id}`);
    fetchShipments();
  };

  return (
    <>
    <NavbarComp />
    <div className="container">
      <div className="py-4">
        <div className="float-container">
          <div className="float-contain" >
      <Link className="btn btn-dark" to="/addshipment">
            Add Shipment Details
          </Link>
          </div>
          </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product_ID</th>
              <th scope="col">Quantity</th>
              <th scope="col">Location</th>
              <th scope="col">Timestamp</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.productid}</td>
                <td>{user.quantity}</td>
                <td>{user.location}</td>
                <td>{user.timestamp}</td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/viewshipment/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editshipment/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
