import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from './ProductList';
import InventoryDashboard from './InventoryDashboard';
import SalesTracker from './SalesTracker';
import AddSales from './AddSales';
import ViewSales from './ViewSales';
import EditSales from './EditSales';
import LocationManager from './LocationManager';
import BarcodeScannerIntegration from './BarcodeScannerIntegration';
import Reports from './Reports';
import "../App.css"
import PurchaseOrder from './PurchaseOrder';
import ShipmentHome from './ShipmentHome';
import AddShipment from './AddShipment';
import EditShipment from './EditShipment';
import ViewShipment from './ViewShipment';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Signup';
import Login from './Login';
import Login_And_Signup_Page from './Login_And_Signup_Page';
import WelcomePage from './WelcomePage';
import Shipment from './Shipment';

function RoutingComponent() {
  return (

    <Router>
      <ToastContainer/>
    <div>
    <Link to="/" style={styles.text}></Link>
    {/* <nav className="navbar navbar-expand-lg  navbar navbar-expand-sm bg-dark navbar-dark">
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
      </nav> */}
    </div>

    <div>
    <Routes>
          
           <Route path="/" element={<Login_And_Signup_Page />} />
           <Route path="/welcome" element={<WelcomePage />} />
           <Route path="/product" element={<ProductList />} />
           <Route path="/dashboard" element={<InventoryDashboard />} />
           <Route path="/sales" element={<SalesTracker />} />
           <Route path="/addsales" element={<AddSales />} />
           <Route path="/editsales/:id" element={<EditSales />} />
           <Route path="/viewsales/:id" element={<ViewSales />} />
           <Route path="/locations" element={<LocationManager />} />
           <Route path="/scanner" element={<BarcodeScannerIntegration />} />
           <Route path="/reports" element={<Reports />} />
           <Route path="/purchase" element={<PurchaseOrder />} />
           <Route path="/shipment" element={<ShipmentHome />} />
           <Route path="/addshipment" element={<AddShipment />} />
           <Route path="/editshipment/:id" element={<EditShipment />} />
           <Route path="/viewshipment/:id" element={<ViewShipment />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
    </Routes>
    </div>
    </Router>
  );
};

const styles={
    text: {
       fontStyle:'italic'
      }
}

export default RoutingComponent;