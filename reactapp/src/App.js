import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import InventoryDashboard from './components/InventoryDashboard';
import SalesTracker from './components/SalesTracker';
import LocationManager from './components/LocationManager';
import BarcodeScannerIntegration from './components/BarcodeScannerIntegration';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Product List</Link>
            </li>
            <li className="navbar-item">
              <Link to="/inventory" className="navbar-link">Inventory Dashboard</Link>
            </li>
            <li className="navbar-item">
              <Link to="/sales" className="navbar-link">Sales Tracker</Link>
            </li>
            <li className="navbar-item">
              <Link to="/locations" className="navbar-link">Location Manager</Link>
            </li>
            <li className="navbar-item">
              <Link to="/barcode-scanner" className="navbar-link">Barcode Scanner Integration</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/sales" element={<SalesTracker />} />
          <Route path="/locations" element={<LocationManager />} />
          <Route path="/barcode-scanner" element={<BarcodeScannerIntegration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
