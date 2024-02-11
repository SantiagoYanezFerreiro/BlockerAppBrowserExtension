import { useState } from "react";
import WebsiteBlocker from "./components/WebsiteBlocker";
import Blocks from "./components/Blocks";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("overview");

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentPage("websiteblocker")}>
          Blocker
        </button>
        <button onClick={() => setCurrentPage("blocks")}>Blocks</button>
        <button onClick={() => setCurrentPage("stats")}>Stats</button>
        <button onClick={() => setCurrentPage("settings")}>Settings</button>
      </nav>
      {/* Show Content */}
      {currentPage === "websiteblocker" && <WebsiteBlocker />}
      {currentPage === "blocks" && <Blocks />}
      {currentPage === "stats" && <Stats />}
      {currentPage === "settings" && <Settings />}
    </div>
  );
}

export default App;
