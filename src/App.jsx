import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import WebsiteBlocker from "./components/WebsiteBlocker";
import Overview from "./components/Overview";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Overview</Link>
          <Link to="/blocks">Blocks</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        {/* Show Content */}
        <Routes>
          <Route exact path="/" element={<Overview />} />
          <Route path="/blocks" element={<WebsiteBlocker />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
