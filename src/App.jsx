import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteBlocker from "./components/WebsiteBlocker";
import Overview from "./components/Overview";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import "./App.css";

function App() {
  return (
    <div>
      <Logo />
      <Router>
        <Navbar />
        {/* Show Content */}
        <Routes>
          <Route exact path="/" element={<Overview />} />
          <Route path="/blocks" element={<WebsiteBlocker />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
