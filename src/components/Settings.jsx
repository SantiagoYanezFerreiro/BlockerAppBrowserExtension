import { useState } from "react";
import "../Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [use24HourNotation, setUse24HourNotation] = useState(true);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("Monday");
  const [applicationTheme, setApplicationTheme] = useState("Light");
  const [openOnStartup, setOpenOnStartup] = useState(false);
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
  return (
    <div className="settings-section">
      <h2>Preferences</h2>
      <p>Use 24 Hour Notation</p>
      <p>First Day of the Week</p>
      <p>Application Theme</p>
      <p>Open Blocker App on Startup</p>
    </div>
  );
}

function Notifications() {
  return (
    <div className="settings-section">
      <h2>Notifications</h2>
      <p>Show Notification when a lock starts</p>
      <p>Show Notifications when a lock ends</p>
      <p>Show Notification when an app is blocked</p>
      <p>Show Warning before lock starts</p>
      <p>Minutes of advance warning before lock starts</p>
      <p>Show Warning before an allowance runs out</p>
      <p>Minutes of advance warning before allowance runs out</p>
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
