import { useState } from "react";
import Toggle from "../components/Toggle.jsx";
import "../Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="settings-container">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("general")}
          className={activeTab === "general" ? "active" : ""}
        >
          Preferences
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={activeTab === "notifications" ? "active" : ""}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("blocking")}
          className={activeTab === "blocking" ? "active" : ""}
        >
          Blocking Rules
        </button>
        <button
          onClick={() => setActiveTab("statistics")}
          className={activeTab === "statistics" ? "active" : ""}
        >
          Statistics
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "general" && <Preferences />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "blocking" && <BlockingRules />}
        {activeTab === "statistics" && <Statistics />}
      </div>
    </div>
  );
}

function Preferences() {
  const [use24HourNotation, setUse24HourNotation] = useState(true);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("Monday");
  const [applicationTheme, setApplicationTheme] = useState("Light");
  const [openOnStartup, setOpenOnStartup] = useState(false);

  const handleDayChange = (event) => {
    setFirstDayOfWeek(event.target.value);
  };

  const handleThemeChange = () => {
    setApplicationTheme(applicationTheme === "Light" ? "Dark" : "Light");
  };

  const handle24HourToggle = () => {
    setUse24HourNotation(!use24HourNotation);
  };

  const handleStartupToggle = () => {
    setOpenOnStartup(!openOnStartup);
  };

  return (
    <div className="settings-section">
      <h2>Preferences</h2>
      <div className="settings-preferences-section">
        <label htmlFor="Use 24 Hour Notation">Use 24 Hour Notation</label>
        <Toggle isEnabled={use24HourNotation} onToggle={handle24HourToggle} />
      </div>
      <div className="settings-preferences-section">
        <label>First Day of the Week</label>
        <select value={firstDayOfWeek} onChange={handleDayChange}>
          <option value="Sunday">Sunday</option>
          <option value="Monday" default>
            Monday
          </option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>
      <div className="settings-preferences-section">
        <label>Application Theme</label>
        <select value={applicationTheme} onChange={handleThemeChange}>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="Open on Startup">Open on Startup</label>
        <Toggle
          label="Open on Startup"
          isEnabled={openOnStartup}
          onToggle={handleStartupToggle}
        />
      </div>
    </div>
  );
}

function Notifications() {
  return (
    <div className="settings-section">
      <h2>Notifications</h2>
      <p>Show Notification when a lock starts</p>
      <p>Show Notifications when a lock ends</p>
      <p>Show Warning before a lock starts</p>
      <p>Minutes of advance warning before lock starts</p>
    </div>
  );
}

function BlockingRules() {
  return (
    <div className="settings-section">
      <h2>Blocking Rules</h2>
      <p>Block Time & Language Setting when a block is enabled</p>
      <p>Block Window Task Manager when a Lock is Enabled</p>
      <p>
        Set an Application Password (not to be confused with blocks password) to
        protect your privacy by limiting the acess to Blocks Statistics and
        Settings tabs. This password cannot be recovered
      </p>
      <p></p>
      <p></p>
    </div>
  );
}

function Statistics() {
  return (
    <div className="settings-section">
      <h2>Statistics</h2>
      <p>Enable Statistics</p>
      <p>
        Count time towards any blocked site or app even if the tab is inactive
        or minimized
      </p>
      <p>
        Delete all statistics. You cannot delete them while a locked block has
        an allowance for a break
      </p>
      <p></p>
    </div>
  );
}
