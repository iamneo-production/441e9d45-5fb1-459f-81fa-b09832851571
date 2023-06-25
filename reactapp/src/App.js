import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddShipment from "./users/AddShipment";
import EditShipment from "./users/EditShipment";
import ViewShipment from "./users/ViewShipment";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addshipment" element={<AddShipment />} />
          <Route exact path="/editshipment/:id" element={<EditShipment />} />
          <Route exact path="/viewshipment/:id" element={<ViewShipment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
