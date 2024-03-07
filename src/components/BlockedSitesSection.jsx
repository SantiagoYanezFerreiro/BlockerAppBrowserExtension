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
  onLockSubmit,
  onUnlockSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [lockValue, setlockValue] = useState("");
  const [unlockAttempt, setUnlockAttempt] = useState("");
  const [unlockInput, setUnlockInput] = useState("");

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
    onLockSubmit(index, section.lockMethod, lockValue);

    setlockValue("");
  };

  const handleLockMethodChange = (event) => {
    const newLockMethod = event.target.value;
    onLockMethodChange(index, newLockMethod);
  };

  const handleUnlockAttempt = () => {
    event.preventDefault();
    if (unlockAttempt === section.lockValue) {
      onUnlockSection(index);
      setUnlockAttempt("");
    } else {
      alert("incorrect attempt");
    }
  };

  const renderLockMethodSelector = () => {
    if (section.locked) {
      return (
        <select value={section.lockMethod} onChange={handleLockMethodChange}>
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
    return (
      <input
        type={inputType}
        value={lockValue}
        onChange={(e) => handlelockValue(e.target.value)}
      />
    );
  };

  const renderLockToggle = () => {
    const buttonText = section.locked ? "Submit" : "Unlock";
    const clickHandler = section.locked
      ? handleLockSubmit
      : handleUnlockAttempt;
    return (
      <>
        {renderLockInputs()}
        <button className="save-lock-button" onClick={clickHandler}>
          {buttonText}
        </button>
        <p className="toggle-text">{section.locked ? "Off" : "On"}</p>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={!section.locked}
            onChange={onToggleSectionLock}
          />

          <span className="slider round"></span>
        </label>
      </>
    );
  };

  return (
    <div className="blocker-sites-section">
      <h2 className="section-name" onClick={() => onToggleModal(index)}>
        {title}
      </h2>
      {renderLockMethodSelector()}
      {renderLockToggle()}

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
                  <FaRegWindowClose
                    className="icon"
                    onClick={() => setEditingIndex(null)}
                  />
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
              <VscDiffAdded
                className="icon"
                onClick={handleAddWebsite}
                Add
                Website
              />
            </div>
            <div className="add-edit-section">
              <input
                type="text"
                value={title} // Use title from props directly
                onChange={(e) => onEditSectionTitle(e.target.value)}
                placeholder="Enter Section Title"
              />
              <AiOutlineDelete
                className="icon"
                onClick={() => onDeleteSection(index)}
                Delete
                Section
              />

              <FaRegWindowClose className="icon" onClick={onCloseModal} Close />
            </div>
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
};
