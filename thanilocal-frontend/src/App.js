import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Locations from "./components/Locations";
import Itinerary from "./components/Itinerary";
import Marketplace from "./components/Marketplace";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar will be visible on all pages */}
        <Navbar />
        
        <Routes>
          <Route path="/locations" element={<Locations />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
