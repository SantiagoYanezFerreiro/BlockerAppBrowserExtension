import { useState } from "react";
import PropTypes from "prop-types";
import "../BlockedSitesSection.css";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { FaRegWindowClose } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";

export default function BlockedSitesSection({
  index,
  title,
  section,
  sites,
  isModalOpen,
  onCloseModal,
  onToggleModal,
  onAddWebsite,
  onEditWebsite,
  onEditSectionTitle,
  onDeleteSection,
  onDeleteWebsite,
  onUpdateTimeRange,
  onToggleSectionLock,
  onLockMethodChange,
  onSectionUpdate,
  onUnlockSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [lockValue, setLockValue] = useState("");
  const [unlockAttempt, setUnlockAttempt] = useState("");
  const [wasSuccesfullyUnlocked, setWasSuccessfullyUnlocked] = useState(false);
  const [confirmLockValue, setConfirmLockValue] = useState("");
  const [numChars, setNumChars] = useState(0);
  const [restartLock, setRestartLock] = useState(false);
  const [timeRangeLock, setTimeRangeLock] = useState({
    startTime: "",
    endTime: "",
    days: [],
  });

  const handleAddWebsite = () => {
    onAddWebsite(newWebsite);
    setNewWebsite("");
  };

  const handleEditWebsite = (siteIndex, site) => {
    setEditingIndex(siteIndex);
    setEditingValue(site);
  };

  const handleSaveEdit = () => {
    onEditWebsite(editingIndex, editingValue);
    setEditingIndex(null);
    setEditingValue("");
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

  const handleDaySelectionChange = (day) => {
    setTimeRangeLock((prevState) => {
      const updatedDays = prevState.days.includes(day)
        ? prevState.days.filter((d) => d !== day)
        : [...prevState.days, day];
      const newTimeRange = { ...prevState, days: updatedDays };
      props.onUpdateChange(newTimeRange);
      return newTimeRange;
    });
  };

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

  const handleLockMethodChange = (event) => {
    const newLockMethod = event.target.value;
    onLockMethodChange(index, newLockMethod);

    if (newLockMethod === "randomText") {
      setLockValue(generateRandomString(20));
    } else {
      setLockValue("");
    }
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

  const renderLockMethodSelector = () => {
    if (!section.locked) {
      return (
        <select
          value={section.lockMethod || ""}
          onChange={handleLockMethodChange}
        >
          <option value="timer">Timer</option>
          <option value="randomText">Random Text</option>
          <option value="password">Password</option>{" "}
          <option value="timeRange">Time Range</option>
          <option value="restart">Restart</option>
        </select>
      );
    }
    return null;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().substring(0, 16); // 'YYYY-MM-DDTHH:mm' format
  };

  const renderLockInputs = () => {
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
      case "randomText":
        if (section.locked) {
          return (
            <div
              style={{ userSelect: "none" }}
              onCopy={(e) => e.preventDefault()}
            >
              {lockValue}
            </div>
          );
        } else {
          inputType = "number";
          inputValue = numChars;
          inputChangeHandler = (e) => {
            const newNumChars = e.target.value;
            setNumChars(newNumChars);
            if (newNumChars > 0) {
              setLockValue(generateRandomString(newNumChars));
            } else {
              setLockValue("");
            }
          };

          return (
            <div>
              <input
                type={inputType}
                placeholder="Number of characters"
                value={inputValue}
                onChange={inputChangeHandler}
              />
            </div>
          );
        }
      case "password":
        inputType = "password";
        if (section.locked) {
          inputValue = unlockAttempt || "";
          inputChangeHandler = (e) => setUnlockAttempt(e.target.value);
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
              Locked from {section.timeRange.startTime} to{" "}
              {section.timeRange.endTime} on {section.timeRange.days.join(", ")}
            </div>
          );
        } else {
          return (
            <div>
              <label>Start Time</label>
              <input
                type="time"
                value={section.timeRange.startTime}
                onChange={(e) => handleStartTimeChange(e)}
              />
              <label>End Time</label>
              <input
                type="time"
                value={section.timeRange.endTime}
                onChange={(e) => handleEndTimeChange(e)}
              />
            </div>
          );
        }
    }

    const renderLockToggle = () => {
      const isLocked = section.locked;
      const buttonText = isLocked ? "Unlock" : "Submit";
      const clickHandler = isLocked ? handleUnlockAttempt : handleLockSubmit;

      return (
        <>
          {renderLockInputs()}
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

    return (
      <div className="blocker-sites-section">
        <h2 className="section-name" onClick={() => onToggleModal(index)}>
          {title}
        </h2>

        {isModalOpen && (
          <ul>
            {sites.map((site, siteIndex) => (
              <li key={siteIndex} className="site-item">
                {editingIndex === siteIndex ? (
                  <div>
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <TfiSave className="icon" onClick={handleSaveEdit} />
                    <FaRegWindowClose />
                    <div
                      className="icon"
                      onClick={() => setEditingIndex(null)}
                    ></div>
                  </div>
                ) : (
                  <div>
                    <p className="site-name">{site}</p>

                    <FaPencilAlt
                      className="icon"
                      onClick={() => handleEditWebsite(siteIndex, site)}
                    />

                    <AiOutlineDelete
                      className="icon"
                      onClick={() => onDeleteWebsite(siteIndex)}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content ">
              <div className="add-edit-website">
                <input
                  type="text"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="Enter new website"
                />
                <div className="icon-button" onClick={handleAddWebsite}>
                  <VscDiffAdded className="icon" />
                </div>
              </div>

              <div className="add-edit-section">
                <input
                  type="text"
                  value={title} // Use title from props directly
                  onChange={(e) => onEditSectionTitle(e.target.value)}
                  placeholder="Enter Section Title"
                />
                <div className="icon-button">
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => onDeleteSection(index)}
                  />

                  <FaRegWindowClose className="icon" onClick={onCloseModal} />
                </div>
              </div>
            </div>
            <div className="lock-section">
              {renderLockMethodSelector()}
              {renderLockToggle()}
            </div>
          </div>
        )}
      </div>
    );
  };
}

BlockedSitesSection.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  sites: PropTypes.array.isRequired,
  section: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  onAddWebsite: PropTypes.func.isRequired,
  onEditWebsite: PropTypes.func.isRequired,
  onEditSectionTitle: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
  onDeleteWebsite: PropTypes.func.isRequired,
  onUpdateTimeRange: PropTypes.func.isRequired,
  onToggleSectionLock: PropTypes.func.isRequired,
  onLockMethodChange: PropTypes.func.isRequired,
  onLockSubmit: PropTypes.func.isRequired,
  onUnlockSection: PropTypes.func.isRequired,
  onSectionUpdate: PropTypes.func.isRequired,
};
