import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSales from "./users/AddSales";
import EditSales from "./users/EditSales";
import ViewSales from "./users/ViewSales";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addsales" element={<AddSales/>} />
          <Route exact path="/editsales/:id" element={<EditSales />} />
          <Route exact path="/viewsales/:id" element={<ViewSales />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;