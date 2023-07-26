import React from 'react'
import { Link } from 'react-router-dom'
function NavbarComp() {
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
    </nav>  
    </>
  )
}

export default NavbarComp