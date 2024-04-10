import { useState } from "react";
import PropTypes from "prop-types";

export default function LockOptions({
  section,
  index,
  onLockMethodChange,
  onUpdateTimeRange,
  onToggleSectionLock,
  onSectionUpdate,
  onUnlockSection,
}) {
  const [lockValue, setLockValue] = useState("");
  const [unlockAttempt, setUnlockAttempt] = useState("");
  const [wasSuccesfullyUnlocked, setWasSuccessfullyUnlocked] = useState(false);
  const [confirmLockValue, setConfirmLockValue] = useState("");
  const [numChars, setNumChars] = useState(20);
  const [timeRangeLock, setTimeRangeLock] = useState({
    startTime: "",
    endTime: "",
  });

  //Handlers for Blocking Methods

  const handleLockSubmit = () => {
    if (section.lockMethod === "password" && lockValue !== confirmLockValue) {
      alert("incorrect password");
      return;
    }
    const updatedSection = { ...section, lockValue, locked: true };
    // Call a function that updates the state in the parent component
    // This function should handle saving the updated section to storage
    onSectionUpdate(updatedSection, index);
  };

  const handleUnlockAttempt = (e) => {
    e.preventDefault();
    console.log("Attempt:", unlockAttempt);
    console.log("Expected:", section.lockValue);
    if (unlockAttempt === section.lockValue) {
      onUnlockSection(index);
      setUnlockAttempt("");
      console.log("Unlock successful");
    } else {
      // Log an error message
      console.error("Incorrect unlock attempt");
      alert("Incorrect password, please try again.");
    }
  };

  const handleLockMethodChange = (event) => {
    const newLockMethod = event.target.value;
    onLockMethodChange(index, newLockMethod);

    if (newLockMethod === "randomText") {
      setLockValue(generateRandomString(20));
    } else if (newLockMethod === "password") {
      setLockValue("");
      setConfirmLockValue("");
    } else if (newLockMethod === "timer") {
      const initialTimerValue = getCurrentDateTime();
      setLockValue(initialTimerValue);
    } else {
      setLockValue("");
    }
  };

  //Handlers for Blocking Methods

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

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().substring(0, 16); // 'YYYY-MM-DDTHH:mm' format
  };

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRS";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const renderLockMethodSelector = () => {
    if (!section.locked) {
      return (
        <select
          className="lock-method-selector"
          value={section.lockMethod || ""}
          onChange={handleLockMethodChange}
        >
          <option value="none">None</option>
          <option value="password">Password</option>{" "}
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
                  type="randomText"
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
                onChange={(e) => setUnlockAttempt(e.target.value)}
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
    const clickHandler = isLocked ? handleUnlockAttempt : handleLockSubmit;

    return (
      <>
        <button className="save-lock-button" onClick={clickHandler}>
          {buttonText}
        </button>
        <p className="toggle-text">{section.locked ? "On" : "Off"}</p>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={section.locked}
            onChange={onToggleSectionLockAdjusted}
          />
          <span className="slider round"></span>
        </label>
      </>
    );
  };

  const onToggleSectionLockAdjusted = () => {
    if (section.locked) {
      setWasSuccessfullyUnlocked(false);
    } else if (wasSuccesfullyUnlocked) {
      setLockValue(section.lockValue);
    }
    onToggleSectionLock(index);
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
};
