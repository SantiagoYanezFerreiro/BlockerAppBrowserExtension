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
  const [NotificationLockStarts, setNotificationLockStarts] = useState(false);
  const [NotificationLockEnds, setNotificationLockEnds] = useState(false);
  const [WarningBeforeLockStarts, setWarningBeforeLockStarts] = useState(false);
  const [MinutesWarningBeforeLock, setMinutesWarningBeforeLock] = useState(0);

  const handleNotificationLockStarts = () => {
    setNotificationLockStarts(!NotificationLockStarts);
  };
  const handleNotificationLockEnds = () => {
    setNotificationLockEnds(!NotificationLockStarts);
  };
  const handleWarningBeforeLockStarts = () => {
    setWarningBeforeLockStarts(!WarningBeforeLockStarts);
  };
  const handleMinutesWarningBeforeLock = () => {
    setMinutesWarningBeforeLock(!MinutesWarningBeforeLock);
  };
  return (
    <div className="settings-section">
      <h2>Notifications</h2>
      <div className="settings-preferences-section">
        <label htmlFor="Notification Lock Starts">
          Notification Lock Starts
        </label>
        <Toggle
          label="Notification Lock Starts"
          isEnabled={NotificationLockStarts}
          onToggle={handleNotificationLockStarts}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="ShowNotificationsWhenLockEnds">
          Show Notifications when a lock ends
        </label>
        <Toggle
          label="Notification Lock Ends"
          isEnabled={NotificationLockEnds}
          onToggle={handleNotificationLockEnds}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="ShowWarningBeforeLockStarts">
          Show Warning before a lock starts
        </label>
        <Toggle
          label="ShowWarningBeforeLockStarts"
          isEnabled={WarningBeforeLockStarts}
          onToggle={handleWarningBeforeLockStarts}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="MinutesBeforeLockStarts">
          Minutes of advance warning before lock starts
        </label>
        <input
          type="number"
          id="minutes-before-lock"
          value={MinutesWarningBeforeLock}
          onChange={handleMinutesWarningBeforeLock}
          min="0"
          step="1"
        />
      </div>
    </div>
  );
}

function BlockingRules() {
  const [BlockTimeLangSettings, setBlockTimeLangSettings] = useState(false);
  const [BlockTaskManager, setBlockTaskManager] = useState(false);
  const [ApplicationPassword, setApplicationPassword] = useState();
  return (
    <div className="settings-section">
      <h2>Blocking Rules</h2>
      <div className="settings-preferences-section">
        <label htmlFor="BlockTimeLanguage">
          Block Time & Language Setting when a block is enabled
        </label>
        <Toggle
          label="BlockTimeLanguage"
          isEnabled={BlockTimeLangSettings}
          onToggle={setBlockTimeLangSettings}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="BlockTaskManager">
          Block Window Task Manager when a Lock is Enabled
        </label>
        <Toggle
          label="BlockTaskManager"
          isEnabled={BlockTaskManager}
          onToggle={setBlockTaskManager}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="SetAppPassword">
          Set an Application Password to protect your privacy by limiting the
          acess to Blocks Statistics and Settings tabs.Cannot be recovered.
        </label>
        <Toggle
          label="SetAppPassword"
          isEnabled={ApplicationPassword}
          onToggle={setApplicationPassword}
        />
      </div>
    </div>
  );
}

function Statistics() {
  const [EnableStats, setEnableStats] = useState(false);
  const [CountInactiveTime, setCountInactiveTime] = useState(false);
  const [DeleteStats, setDeleteStats] = useState(false);
  return (
    <div className="settings-section">
      <h2>Statistics</h2>
      <div className="settings-preferences-section">
        <label htmlFor="Enable Statistics">Enable Statistics</label>
        <Toggle
          label="Enable Stats"
          isEnabled={EnableStats}
          onToggle={setEnableStats}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="Count Inactive Time">
          Count time towards any blocked site or app even if the tab is inactive
          or minimized
        </label>
        <Toggle
          label="CountInactiveTime"
          isEnabled={CountInactiveTime}
          onToggle={setCountInactiveTime}
        />
      </div>
      <div className="settings-preferences-section">
        <label htmlFor="Delete Statistics">
          Delete all statistics. You cannot delete them while a locked block has
          an allowance for a break
        </label>
        <Toggle
          label="DeleteStats"
          isEnabled={DeleteStats}
          onToggle={setDeleteStats}
        />
      </div>
    </div>
  );
}
