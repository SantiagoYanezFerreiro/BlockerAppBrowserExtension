import { useState } from "react";
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
  onSectionUpdate,
  onUnlockSection,
}) {
  const [showLockOptions, setShowLockOptions] = useState(false);

  const toggleLockOptions = () => setShowLockOptions(!showLockOptions);

  const handleToggleSectionLock = () => {
    onToggleSectionLock(index); // Added
  };

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
                />
              </div>
            )}
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
  onDuplicateSection: PropTypes.func.isRequired,
  onUpdateTimeRange: PropTypes.func.isRequired,
  onToggleSectionLock: PropTypes.func.isRequired,
  onLockMethodChange: PropTypes.func.isRequired,
  onLockSubmit: PropTypes.func.isRequired,
  onUnlockSection: PropTypes.func.isRequired,
  onSectionUpdate: PropTypes.func.isRequired,
};
