import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../BlockedSitesSection.css";
import LockOptions from "../components/LockOptions.jsx";
import BlocksModal from "../components/BlocksModal.jsx";
import Toggle from "../components/Toggle.jsx";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import { FaLock, FaLockOpen, FaRegCopy } from "react-icons/fa";
import { calculateRemainingTime } from "../utils/utils.js";

export default function BlockedSitesSection({
  index,
  title,
  section,
  isModalOpen,
  onCloseModal,
  onToggleModal,
  onAddWebsite,
  onEditWebsite,
  onEditSectionTitle,
  onDeleteSection,
  onDeleteWebsite,
  onDuplicateSection,
  onLockMethodChange,
  onUpdateTimeRange,
  onToggleSectionLock,
  onAllowanceTimeChange,
  onSectionUpdate,
  onUnlockSection,
  updateLockValue,
}) {
  const [showLockOptions, setShowLockOptions] = useState(false);
  const [showAllowanceInput, setShowAllowanceInput] = useState(false);
  const [allowanceMinutes, setAllowanceMinutes] = useState(
    section.allowanceTime || 0
  );
  const [remainingLockTime, setRemainingLockTime] = useState("");
  const [isLocked, setIsLocked] = useState(section.locked);
  const [showUnlockForm, setShowUnlockForm] = useState(false);

  const toggleLockOptions = () => setShowLockOptions(!showLockOptions);

  const handleToggleSectionLock = () => {
    console.log("Toggling section lock. Current isLocked state:", isLocked);
    const newIsLocked = !isLocked;
    setIsLocked(newIsLocked);
    onToggleSectionLock(index);

    console.log(`newIsLocked: ${newIsLocked}`);
    if (newIsLocked) {
      setShowUnlockForm(true);
      setShowLockOptions(false);
      console.log("Unlock form should be shown");
    } else {
      setShowLockOptions(true);
      setShowUnlockForm(false);
      console.log("Lock options should be shown");
    }
  };

  const handleAllowanceMinutesChange = (event) => {
    const newAllowanceTimes = parseInt(event.target.value, 10);
    console.log(`New Allowance Minutes: ${newAllowanceTimes}`);
    setAllowanceMinutes(newAllowanceTimes);
    onAllowanceTimeChange(index, newAllowanceTimes);
  };

  const handleLockSubmit = (lockValue) => {
    const updatedSection = { ...section, lockValue, locked: true };
    onSectionUpdate(updatedSection, index);
    updateLockValue(lockValue, index);
    setIsLocked(true);
    setShowLockOptions(false); // Hide the lock options after submission
    setShowUnlockForm(false); // Hide the unlock form after submission
    console.log("Section locked with lockValue:", lockValue);
  };

  const handleUnlockSection = (index) => {
    const updatedSection = { ...section, lockValue: "", locked: false };
    onSectionUpdate(updatedSection, index);
    setIsLocked(false);
    setShowUnlockForm(false);
    console.log("Section unlocked");
  };

  const saveAllowanceTime = () => {
    console.log(
      `Saving Allowance Time: ${allowanceMinutes} for section index: ${index}`
    );
    onAllowanceTimeChange(allowanceMinutes);
    setShowAllowanceInput(false);
  };

  useEffect(() => {
    setAllowanceMinutes(section.allowanceTime || 0); // Update allowance minutes from section data
  }, [section.allowanceTime]);

  useEffect(() => {
    console.log(
      `BlockedSitesSection: Current allowance time: ${allowanceMinutes}`
    );
  }, [allowanceMinutes]);

  useEffect(() => {
    if (section.lockMethod === "timer" && section.locked) {
      setRemainingLockTime(calculateRemainingTime(section.lockValue));
    }
  }, [section.lockValue, section.lockMethod, section.locked]);

  useEffect(() => {
    console.log("BlockedSitesSection props:", section);
  }, [section]);

  useEffect(() => {
    setIsLocked(section.locked);
  }, [section.locked]);

  return (
    <div className="blocker-sites-section">
      <h2 className="section-name" onClick={() => onToggleModal(index)}>
        {isModalOpen ? `Editing ${title}` : `${title}`}
        {!isModalOpen && (
          <>
            <FaPencilAlt onClick={() => onEditSectionTitle(index)}>
              Edit
            </FaPencilAlt>
            <FaRegCopy onClick={() => onDuplicateSection(index)}>
              Duplicate
            </FaRegCopy>
            <AiOutlineDelete onClick={() => onDeleteSection(index)}>
              Delete
            </AiOutlineDelete>
            <p className="toggle-text">{section.locked ? "On" : "Off"}</p>
            <Toggle
              isEnabled={section.locked}
              onToggle={handleToggleSectionLock} // Pass the correct function here
              label="Lock Section"
            />
          </>
        )}
      </h2>
      {isModalOpen && (
        <BlocksModal
          section={section}
          sectionIndex={index}
          closeModal={onCloseModal}
          addWebsitesToSection={onAddWebsite}
          editWebsiteInSection={onEditWebsite}
          deleteWebsiteFromSection={onDeleteWebsite}
        />
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="add-edit-section">
              <input
                type="text"
                value={title}
                onChange={(e) => onEditSectionTitle(e.target.value)}
                placeholder="Enter Section Title"
              />
              <div className="icon-button-container">
                <AiOutlineDelete
                  className="icon"
                  onClick={() => onDeleteSection(index)}
                />
                <FaRegWindowClose className="icon" onClick={onCloseModal} />
                <div className="icon" onClick={toggleLockOptions}>
                  {section.locked ? <FaLockOpen /> : <FaLock />}
                </div>
              </div>
            </div>
            {!isLocked && !showUnlockForm && (
              <div className="lock-section">
                <LockOptions
                  section={section}
                  index={index}
                  onLockMethodChange={onLockMethodChange}
                  onUpdateTimeRange={onUpdateTimeRange}
                  onToggleSectionLock={onToggleSectionLock}
                  onUnlockSection={handleUnlockSection}
                  onSectionUpdate={onSectionUpdate}
                  updateLockValue={updateLockValue}
                  handleLockSubmit={handleLockSubmit}
                  showUnlockForm={showUnlockForm}
                  setShowUnlockForm={setShowUnlockForm} // Add this line
                  isLocked={isLocked}
                />
              </div>
            )}
            {showUnlockForm && (
              <div className="unlock-section">
                <LockOptions
                  section={section}
                  index={index}
                  onLockMethodChange={onLockMethodChange}
                  onUpdateTimeRange={onUpdateTimeRange}
                  onToggleSectionLock={onToggleSectionLock}
                  onSectionUpdate={onSectionUpdate}
                  onUnlockSection={handleUnlockSection}
                  updateLockValue={updateLockValue}
                  handleLockSubmit={handleLockSubmit}
                  showUnlockForm={showUnlockForm}
                  setShowUnlockForm={setShowUnlockForm} // Pass the state setter
                  isLocked={isLocked}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div>
        <p>
          <span
            className="allowance-text"
            onClick={() => setShowAllowanceInput(!showAllowanceInput)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {allowanceMinutes > 0
              ? `${allowanceMinutes} minutes remaining`
              : "No Allowance Time Remaining"}
            {section.lockedTime}
          </span>
        </p>
        {showAllowanceInput && (
          <div>
            <input
              type="number"
              value={allowanceMinutes}
              onChange={handleAllowanceMinutesChange}
              placeholder="Enter allowance minutes"
            />
            <button onClick={saveAllowanceTime}>Save</button>
          </div>
        )}
        {section.lockMethod === "timer" && section.locked && (
          <p>
            <FaLock />
            {remainingLockTime}
          </p>
        )}
      </div>
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
  onDuplicateSection: PropTypes.func.isRequired,
  onUpdateTimeRange: PropTypes.func.isRequired,
  onToggleSectionLock: PropTypes.func.isRequired,
  onLockMethodChange: PropTypes.func.isRequired,
  onLockSubmit: PropTypes.func.isRequired,
  onUnlockSection: PropTypes.func.isRequired,
  onSectionUpdate: PropTypes.func.isRequired,
  onAllowanceTimeChange: PropTypes.func.isRequired,
  updateLockValue: PropTypes.func.isRequired,
};
