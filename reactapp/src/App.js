import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import InventoryDashboard from './components/InventoryDashboard';
import SalesTracker from './components/SalesTracker';
import LocationManager from './components/LocationManager';
import BarcodeScannerIntegration from './components/BarcodeScannerIntegration';


const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/" style={styles.navLink}>Product List</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/dashboard" style={styles.navLink}>Inventory Dashboard</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/sales" style={styles.navLink}>Sales Tracker</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/locations" style={styles.navLink}>Location Manager</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/scanner" style={styles.navLink}>Barcode Scanner Integration</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/dashboard" element={<InventoryDashboard />} />
          <Route path="/sales" element={<SalesTracker />} />
          <Route path="/locations" element={<LocationManager />} />
          <Route path="/scanner" element={<BarcodeScannerIntegration />} />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '20px',
  },
  nav: {
    marginBottom: '20px',
    backgroundColor: '#f2f2f2',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    marginRight: '10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease',
  },
  navLinkActive: {
    backgroundColor: '#333',
    color: '#fff',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};


export default App;
