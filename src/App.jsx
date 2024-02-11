import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import WebsiteBlocker from "./components/WebsiteBlocker";
import Blocks from "./components/Blocks";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">WebsiteBlocker</Link>
          <Link to="/blocks">Blocks</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        {/* Show Content */}
        <Routes>
          <Route exact path="/" element={<WebsiteBlocker />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
