import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from './ProductList';
import InventoryDashboard from './InventoryDashboard';
import SalesTracker from './SalesTracker';
import LocationManager from './LocationManager';
import BarcodeScannerIntegration from './BarcodeScannerIntegration';
import Reports from './Reports';
import "../App.css"
import PurchaseOrder from './PurchaseOrder';
import HomeText from './HomeText';

function Home() {
  return (

    <Router>
    <div>
    <nav className="navbar navbar-expand-lg  navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid"> 
        <Link to="/" className='navbar-brand' style={styles.text}>IMS</Link>   
        <Link to="/product" className='navbar-brand'>Product List</Link>
        <Link to="/dashboard" className='navbar-brand'>Inventory Dashboard</Link>
        <Link to="/sales" className='navbar-brand'>Sales Tracker</Link>
        <Link to="/purchase" className='navbar-brand'>Purchase Order</Link>   
        <Link to="/locations" className='navbar-brand'>Location</Link>
        <Link to="/scanner" className='navbar-brand'>Barcode</Link>
        <Link className="navbar-brand" to="/reports">Reports</Link>
        <Link className="navbar-brand" to="/shipment">Shipment</Link> 
        </div>
      </nav>
    </div>

    <div>
    <Routes>
           <Route path="/" element={<HomeText />} />
           <Route path="/product" element={<ProductList />} />
           <Route path="/dashboard" element={<InventoryDashboard />} />
           <Route path="/sales" element={<SalesTracker />} />
           <Route path="/locations" element={<LocationManager />} />
           <Route path="/scanner" element={<BarcodeScannerIntegration />} />
           <Route path="/reports" element={<Reports />} />
           <Route path="/purchase" element={<PurchaseOrder />} />
    </Routes>
    </div>
    </Router>
  );
}

const styles={
    text: {
       fontStyle:'italic'
      }
}

export default Home;