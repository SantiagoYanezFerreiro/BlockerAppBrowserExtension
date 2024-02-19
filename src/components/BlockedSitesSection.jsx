import { useState } from "react";
import PropTypes from "prop-types";
import "../BlockedSitesSection.css";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { FaRegWindowClose } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";
import { GrUnlock } from "react-icons/gr";

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
  onToggleSectionEnabled,
  onToggleSectionLock,
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [unlockTime, setUnlockTime] = useState(null);
  const [randomText, setRandomText] = useState("");
  const [password, setPassword] = useState("");

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

  const HandleTimeRangeLock = (time) => {
    setUnlockTime(time);
  };

  const HandleRandomTextLock = (randomStr) => {
    setRandomText(randomStr);
  };

  const HandlePasswordLock = (pass) => {
    setPassword(pass);
  };

  const renderLockInputs = () => {
    console.log("renderLockInputs called, section.locked:", section.locked);
    if (section.locked) {
      console.log("Lock method:", section.lockMethod);
      switch (section.lockMethod) {
        case "timer":
          return (
            <input
              type="datetime-local"
              onChange={(e) => HandleTimeRangeLock(e.target.value)}
            />
          );
        case "randomText":
          return (
            <input
              type="text"
              onChange={(e) => HandleRandomTextLock(e.target.value)}
            />
          );
        case "password":
          return (
            <input
              type="password"
              onChange={(e) => HandlePasswordLock(e.target.value)}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };

  const renderLockToggle = () => {
    return (
      <button onClick={onToggleSectionLock}>
        {section.locked ? <GrUnlock /> : <FaLock />}
      </button>
    );
  };

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
      <p className="toggle-text">{section.enabled ? "On" : "Off"}</p>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={section.enabled}
          onChange={() => onToggleSectionEnabled(index)}
        />
        <span className="slider round"></span>
      </label>
      {renderLockInputs()}
      {renderLockToggle()}
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
  onToggleSectionEnabled: PropTypes.func.isRequired,
  onToggleSectionLock: PropTypes.func.isRequired,
};
