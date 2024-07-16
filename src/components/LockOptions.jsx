import { useState, useEffect } from "react";
import Toggle from "../components/Toggle";
import PropTypes from "prop-types";

export default function LockOptions({
  section,
  index,
  onLockMethodChange,
  onUpdateTimeRange,
  onToggleSectionLock,
  onSectionUpdate,
  onUnlockSection,
  updateLockValue,
  handleLockSubmit,
  showUnlockForm,
  setShowUnlockForm,
  isLocked, // Add this prop// Add this prop
}) {
  const [lockValue, setLockValue] = useState("");
  const [unlockAttempt, setUnlockAttempt] = useState("");
  const [confirmLockValue, setConfirmLockValue] = useState("");
  const [numChars, setNumChars] = useState(20);
  const [timeRangeLock, setTimeRangeLock] = useState({
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (section.locked) {
      setLockValue(section.lockValue);
    }
  }, [section.locked, section.lockValue]);

  const handleLockSubmitInternal = () => {
    if (section.lockMethod === "password" && lockValue !== confirmLockValue) {
      alert("Passwords do not match");
      return;
    }
    handleLockSubmit(lockValue);
    console.log("Lock submit internal:", lockValue);
  };

  const handleUnlockAttempt = (e) => {
    e.preventDefault();
    if (unlockAttempt === section.lockValue) {
      onUnlockSection(index);
      setUnlockAttempt("");
      setLockValue("");
      setShowUnlockForm(false); // Use the passed prop
    } else {
      alert("Incorrect unlock value, please try again.");
    }
  };

  const handleLockMethodChange = (event) => {
    const newLockMethod = event.target.value;
    onLockMethodChange(index, newLockMethod);

    if (newLockMethod === "randomText") {
      const newLockValue = generateRandomString(20);
      setLockValue(newLockValue);
      updateLockValue(newLockValue, index);
    } else if (newLockMethod === "password") {
      setLockValue("");
      setConfirmLockValue("");
    } else if (newLockMethod === "timer") {
      const initialTimerValue = getCurrentDateTime();
      setLockValue(initialTimerValue);
      updateLockValue(initialTimerValue, index);
    } else {
      setLockValue("");
    }
  };

  const handleStartTimeChange = (event) => {
    const newStartTime = event.target.value;
    const newTimeRange = { ...timeRangeLock, startTime: newStartTime };
    setTimeRangeLock(newTimeRange);
    onUpdateTimeRange(newTimeRange);
  };

  const handleEndTimeChange = (event) => {
    const newEndTime = event.target.value;
    const newTimeRange = { ...timeRangeLock, endTime: newEndTime };
    setTimeRangeLock(newTimeRange);
    onUpdateTimeRange(newTimeRange);
  };

  const handleToggleSectionLock = () => {
    onToggleSectionLock(section.index);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().substring(0, 16); // 'YYYY-MM-DDTHH:mm' format
  };

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  console.log("Rendering LockOptions. showUnlockForm:", showUnlockForm);

  const renderLockMethodSelector = () => {
    if (!section.locked) {
      return (
        <select
          className="lock-method-selector"
          value={section.lockMethod || ""}
          onChange={handleLockMethodChange}
        >
          <option value="none">None</option>
          <option value="password">Password</option>
          <option value="randomText">Random Text</option>
          <option value="timeRange">Time Range</option>
          <option value="timer">Timer</option>
        </select>
      );
    }
    return null;
  };

  function renderLockInputs() {
    let inputType;
    let inputValue;
    let inputChangeHandler;

    if (section.locked && showUnlockForm) {
      return (
        <div>
          <input
            type="text"
            placeholder="Enter Unlock Value"
            value={unlockAttempt || ""}
            onChange={(e) => setUnlockAttempt(e.target.value)}
          />
          <button onClick={handleUnlockAttempt}>Unlock</button>
        </div>
      );
    }

    switch (section.lockMethod) {
      case "timer": {
        if (section.locked) {
          return (
            <div className="timer-date-lock">Locked Until {lockValue}</div>
          );
        } else {
          inputType = "datetime-local";
          inputValue = lockValue || "";
          inputChangeHandler = (e) => setLockValue(e.target.value);
          const minDateTime = getCurrentDateTime();

          return (
            <div>
              <div className="timer-date-lock">
                Lock this Block until this day/time
              </div>
              <input
                type={inputType}
                value={inputValue}
                onChange={inputChangeHandler}
                min={minDateTime}
              />
            </div>
          );
        }
      }
      case "none":
        return <p>Do not lock this block and allow to make changes</p>;

      case "randomText":
        if (section.locked) {
          return (
            <div
              style={{ userSelect: "none" }}
              onCopy={(e) => e.preventDefault()}
            >
              {lockValue}
              <div>
                <input
                  type="text"
                  placeholder="Enter Text"
                  value={unlockAttempt || ""}
                  onChange={(e) => setUnlockAttempt(e.target.value)}
                  min="1"
                />
              </div>
            </div>
          );
        } else {
          inputType = "number";
          inputValue = numChars;
          inputChangeHandler = (e) => {
            const newNumChars = parseInt(e.target.value, 10);
            if (!isNaN(newNumChars)) {
              setNumChars(newNumChars);
              if (newNumChars > 0) {
                setLockValue(generateRandomString(newNumChars));
              } else {
                setLockValue("");
              }
            }
          };

          return (
            <div>
              <input
                type={inputType}
                placeholder="Characters Number"
                value={inputValue}
                onChange={inputChangeHandler}
                min="1"
              />
            </div>
          );
        }
      case "password":
        inputType = "password";
        if (section.locked) {
          inputValue = unlockAttempt || "";
          inputChangeHandler = (e) => setUnlockAttempt(e.target.value);
          return (
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                value={unlockAttempt || ""}
                onChange={inputChangeHandler}
              />
            </div>
          );
        } else {
          return (
            <>
              <div>
                <input
                  type={inputType}
                  placeholder="Enter Password"
                  value={lockValue || ""}
                  onChange={(e) => setLockValue(e.target.value)}
                />
              </div>
              <div>
                <input
                  type={inputType}
                  placeholder="Confirm Password"
                  value={confirmLockValue || ""}
                  onChange={(e) => setConfirmLockValue(e.target.value)}
                />
              </div>
            </>
          );
        }
      case "timeRange":
        if (section.locked) {
          return (
            <div className="time-range-lock">
              Locked from {section?.timeRange?.startTime || ""} to{" "}
              {section?.timeRange?.endTime || ""}
            </div>
          );
        } else {
          return (
            <div>
              <div className="timer-date-lock">
                Lock this Block between the following times every day
              </div>
              <label className="label-time">Start Time</label>
              <input
                className="input-time"
                type="time"
                value={section.timeRange.startTime}
                onChange={handleStartTimeChange}
              />
              <label className="label-time">End Time</label>
              <input
                className="input-time"
                type="time"
                value={section.timeRange.endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          );
        }
      default:
        return <p>Do not lock this block and allow to make changes</p>;
    }
  }

  const renderLockToggle = () => {
    const isLocked = section.locked;
    const buttonText = isLocked ? "Unlock" : "Submit";
    const clickHandler = isLocked
      ? handleUnlockAttempt
      : handleLockSubmitInternal;

    return (
      <>
        <button className="save-lock-button" onClick={clickHandler}>
          {buttonText}
        </button>
        <p className="toggle-text">{section.locked ? "On" : "Off"}</p>
        <Toggle
          isEnabled={section.locked}
          onToggle={handleToggleSectionLock}
          label="Lock Section"
        />
      </>
    );
  };

  return (
    <div>
      {renderLockMethodSelector()}
      {renderLockInputs()}
      {renderLockToggle()}
    </div>
  );
}

LockOptions.propTypes = {
  index: PropTypes.number.isRequired,
  section: PropTypes.object.isRequired,
  onUpdateTimeRange: PropTypes.func.isRequired,
  onToggleSectionLock: PropTypes.func.isRequired,
  onLockMethodChange: PropTypes.func.isRequired,
  onUnlockSection: PropTypes.func.isRequired,
  onSectionUpdate: PropTypes.func.isRequired,
  updateLockValue: PropTypes.func.isRequired,
  handleLockSubmit: PropTypes.func.isRequired,
  showUnlockForm: PropTypes.bool.isRequired,
  setShowUnlockForm: PropTypes.func.isRequired, // Add this prop type
  isLocked: PropTypes.bool.isRequired, // Add this prop type
};
