import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { isLoggedInn,doLogout } from './Athentication';
import { useState } from 'react';
import { Button } from 'reactstrap';


function NavbarComp() {

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInn()); // Initialize login status

  let navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    doLogout();
    localStorage.setItem("isLoggedInn", "false");
    setIsLoggedIn(false); // Update login status after logout
    alert("Log Out successful");
    navigate("/login"); // Redirect user to the login page after logout
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg  navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid"> 
            <Link to="/product" className='navbar-brand'>Product List</Link>
            <Link to="/dashboard" className='navbar-brand'>Inventory Dashboard</Link>
            <Link className="navbar-brand" to="/shipment">Shipment</Link> 
            <Link to="/sales" className='navbar-brand'>Sales Tracker</Link>
            <Link to="/purchase" className='navbar-brand'>Purchase Order</Link>   
            <Link to="/locations" className='navbar-brand'>Location</Link>
            <Link to="/scanner" className='navbar-brand'>Barcode</Link>
            <Link className="navbar-brand" to="/reports">Reports</Link> 
        </div>
        <div className="navbar-nav ml-auto">
        {
          // Show logout button only if the user is logged in
          <Button onClick={handleLogout} color="dark" outline>
            Logout
          </Button>
        }
      </div>
    </nav>  
    </>
  )
}

export default NavbarComp