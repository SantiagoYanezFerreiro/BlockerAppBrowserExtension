import { useState } from "react";
import "../Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <div className="settings-containter">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("general")}
          className={activeTab === "general" ? "active" : ""}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("blocking")}
          className={activeTab === "blocking" ? "active" : ""}
        >
          Blocking Rules
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={activeTab === "security" ? "active" : ""}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={activeTab === "notifications" ? "active" : ""}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("statistics")}
          className={activeTab === "statistics" ? "active" : ""}
        >
          Statistics
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "blocking" && <BlockingRules />}
        {activeTab === "security" && <Security />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "statistics" && <Statistics />}
      </div>
    </div>
  );
}

function GeneralSettings() {
  return <div> General Settings </div>;
}

function BlockingRules() {
  return <div> Blocking Rules </div>;
}

function Security() {
  return <div> Security </div>;
}

function Notifications() {
  return <div> Notifications </div>;
}

function Statistics() {
  return <div> Statistics</div>;
}
