import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../BlockedSitesSection.css";
import LockOptions from "../components/LockOptions.jsx";
import BlocksModal from "../components/BlocksModal.jsx";
import Toggle from "../components/Toggle.jsx";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
//import { VscDiffAdded } from "react-icons/vsc";
import { FaRegWindowClose } from "react-icons/fa";
//import { TfiSave } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
//import { TbHours24 } from "react-icons/tb";

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

  const toggleLockOptions = () => setShowLockOptions(!showLockOptions);
  const handleToggleSectionLock = () => {
    onToggleSectionLock(index);
  };

  const handleAllowanceMinutesChange = (event) => {
    const newAllowanceTimes = parseInt(event.target.value, 10);
    setAllowanceMinutes(newAllowanceTimes);
    onAllowanceTimeChange(index, newAllowanceTimes);
  };

  const saveAllowanceTime = () => {
    onAllowanceTimeChange(index, allowanceMinutes);
    setShowAllowanceInput(false);
  };

  useEffect(() => {
    if (section.lockMethod === "timer" && section.locked) {
      const lockUntil = new Date(section.lockValue);
      const now = new Date();
      const timeDiff = lockUntil - now;

      if (timeDiff > 0) {
        const minutes = Math.floor(timeDiff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        let remainingTimeText = "";

        if (months > 0) {
          remainingTimeText = `${months} months remaining`;
        } else if (days > 0) {
          remainingTimeText = `${days} days remaining`;
        } else if (hours > 0) {
          remainingTimeText = `${hours} hours remaining`;
        } else if (minutes > 0) {
          remainingTimeText = `${minutes} minutes remaining`;
        } else {
          remainingTimeText = "Less than a minute remaining";
        }

        setRemainingLockTime(remainingTimeText);
      } else {
        setRemainingLockTime("Block time ended");
      }
    }
  }, [section.lockValue, section.lockMethod, section.locked]);

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
              onToggle={handleToggleSectionLock}
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

            {showLockOptions && (
              <div className="lock-section">
                <LockOptions
                  section={section}
                  index={index}
                  onLockMethodChange={onLockMethodChange}
                  onUpdateTimeRange={onUpdateTimeRange}
                  onToggleSectionLock={onToggleSectionLock}
                  onSectionUpdate={onSectionUpdate}
                  onUnlockSection={onUnlockSection}
                  updateLockValue={updateLockValue}
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
