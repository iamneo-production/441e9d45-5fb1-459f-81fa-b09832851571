import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import InventoryDashboard from './components/InventoryDashboard';
import SalesTracker from './components/SalesTracker';
import LocationManager from './components/LocationManager';
import BarcodeScannerIntegration from './components/BarcodeScannerIntegration';
import Reports from './components/Reports';
import "./App.css";


const App = () => {
  return (
    <Router>
      <div style={styles.container} className=' navbar-light bg-light'>
        <nav style={styles.nav} className='navbar navbar-light bg-light'>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/" className='hii' style={styles.navLink}>Product List</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/dashboard" className='hii' style={styles.navLink}>Inventory Dashboard</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/sales" className='hii' style={styles.navLink}>Sales Tracker</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/locations" className='hii' style={styles.navLink}>Location Manager</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/scanner" className='hii' style={styles.navLink}>Barcode Scanner Integration</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/reports" className='hii' style={styles.navLink}>Reports</Link>
            </li>
          </ul>
        </nav>
        </div>
        <div style={styles.fun}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/dashboard" element={<InventoryDashboard />} />
          <Route path="/sales" element={<SalesTracker />} />
          <Route path="/locations" element={<LocationManager />} />
          <Route path="/scanner" element={<BarcodeScannerIntegration />} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
        </div>
    </Router>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins',
    maxWidth: '2000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f2f2f2',
  },
  nav: {
    //marginBottom: '20px',
    //padding: '20px',
    //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    justifyContent:'end',
    //border:'1px solid grey',
    
  },
  fun: {
    maxWidth:'900px',
    margin: '0 auto',
    padding: '20px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    //justifyContent: 'center',
  },
  navItem: {
    //marginRight: '10px',
  },
  navLink: {
    textDecoration: 'none',
    //color: '#333',
    //fontWeight: 'bold',
    padding: '5px 10px',
    //borderRadius: '4px',
    //backgroundColor: '#fff',
    transition: 'background-color 0.3s ease',
  },
  navLinkActive: {
    backgroundColor: '#333',
    color: '#fff',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};


export default App;
