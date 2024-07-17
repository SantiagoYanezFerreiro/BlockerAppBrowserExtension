import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import WebsiteBlocker from "./components/WebsiteBlocker";
import Overview from "./components/Overview";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import "./App.css";
import { getFromStorage } from "./utils/chromeAPI";

function App() {
  //Lifted state up to display sections in overview
  const [sections, setSections] = useState([]);
  const [showUnlockForm, setShowUnlockForm] = useState(false);

  const updateSections = (newSections) => {
    setSections(newSections);
  };

  useEffect(() => {
    getFromStorage(["sections"], (result) => {
      if (result.sections) {
        setSections(result.sections);
      }
    });
  }, []);

  return (
    <Router>
      <div>
        <Logo />
        <Navbar />
        {/* Show Content */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Overview sections={sections} updateSections={updateSections} />
            }
          />
          <Route
            path="/blocks"
            element={
              <WebsiteBlocker
                sections={sections}
                setSections={setSections}
                updateSections={updateSections}
                showUnlockForm={showUnlockForm}
                setShowUnlockForm={setShowUnlockForm}
              />
            }
          />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
