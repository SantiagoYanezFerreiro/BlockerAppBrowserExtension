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
  onToggleSectionLock,
  onLockMethodChange,
  onSectionUpdate,
  onUnlockSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [lockValue, setlockValue] = useState("");
  const [unlockAttempt, setUnlockAttempt] = useState("");
  const [wasSuccesfullyUnlocked, setWasSuccessfullyUnlocked] = useState(false);
  const [unlockSuccessful, setUnlockSuccessful] = useState(false);

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

  const handlelockValue = (value) => {
    setlockValue(value);
  };

  const handleLockSubmit = () => {
    // Assuming onLockSubmit function updates the section in the parent state and persists to storage
    // Update local state to reflect the change if necessary
    const updatedSection = { ...section, lockValue, locked: true };
    // Call a function that updates the state in the parent component
    // This function should handle saving the updated section to storage
    onSectionUpdate(updatedSection, index);
  };

  const handleLockMethodChange = (event) => {
    const newLockMethod = event.target.value;
    onLockMethodChange(index, newLockMethod);

    if (newLockMethod === "randomText") {
      const randomString = generateRandomString(20);
      setlockValue(randomString);
    } else {
      setlockValue("");
    }
  };

  const handleUnlockAttempt = (e) => {
    e.preventDefault();
    console.log("Attempt:", unlockAttempt);
    console.log("Expected:", section.lockValue);
    if (unlockAttempt === section.lockValue) {
      onUnlockSection(index);
      setUnlockAttempt("");
      setUnlockSuccessful(true);
      console.log("Unlock successful");
    } else {
      // Log an error message
      setUnlockSuccessful(false);
      console.error("Incorrect unlock attempt");
      alert("Incorrect password, please try again.");
    }
  };

  const renderLockMethodSelector = () => {
    if (section.locked) {
      return (
        <select
          value={section.lockMethod || ""}
          onChange={handleLockMethodChange}
        >
          <option value="timer">Timer</option>
          <option value="randomText">Random Text</option>
          <option value="password">Password</option>{" "}
        </select>
      );
    }
    return null;
  };

  const renderLockInputs = () => {
    let inputType;
    let inputValue;
    let inputChangeHandler;
    switch (section.lockMethod) {
      case "timer":
        inputType = "datetime-local";
        break;
      case "randomText":
        inputType = "text";
        break;
      case "password":
        inputType = "password";
        break;
      default:
        return null;
    }

    if (section.locked) {
      inputValue = unlockAttempt || "";
      inputChangeHandler = (e) => setUnlockAttempt(e.target.value);
    } else {
      inputValue = lockValue || "";
      inputChangeHandler = (e) => setlockValue(e.target.value);
    }

    return (
      <input
        type={inputType}
        value={inputValue}
        onChange={inputChangeHandler}
      />
    );
  };

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
    setUnlockSuccessful(false);
    if (section.locked) {
      setWasSuccessfullyUnlocked(false);
    } else if (wasSuccesfullyUnlocked) {
      setlockValue(section.lockValue);
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
  onToggleSectionLock: PropTypes.func.isRequired,
  onLockMethodChange: PropTypes.func.isRequired,
  onLockSubmit: PropTypes.func.isRequired,
  onUnlockSection: PropTypes.func.isRequired,
  onSectionUpdate: PropTypes.func.isRequired,
};
