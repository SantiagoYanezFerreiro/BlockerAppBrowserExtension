import { useState } from "react";
import PropTypes from "prop-types";
import "../BlockedSitesSection.css";
import LockOptions from "../components/LockOptions.jsx";
import BlocksModal from "../components/BlocksModal.jsx";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { FaRegWindowClose } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

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
  onLockMethodChange,
  onUpdateTimeRange,
  onToggleSectionLock,
  onSectionUpdate,
  onUnlockSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [showLockOptions, setShowLockOptions] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  /* Not needed for now
  const handleCloseEditMenu = () => {
    setEditingIndex(null);
    setEditingValue("");
  };*/

  const toggleLockOptions = () => {
    setShowLockOptions(!showLockOptions);
  };

  return (
    <div className="blocker-sites-section">
      <h2 className="section-name" onClick={() => onToggleModal(index)}>
        {title}
      </h2>
      <button onClick={openModal}>Edit{title}</button>

      {showModal && (
        <BlocksModal
          section={section}
          sectionIndex={index}
          closeModal={closeModal}
          addWebsitesToSection={onAddWebsite}
          editWebsiteInSection={onEditWebsite}
          deleteWebsiteFromSection={onDeleteWebsite}
        ></BlocksModal>
      )}
      {isModalOpen && (
        <ul>
          {sites.map((site, siteIndex) => (
            <li
              key={siteIndex}
              className="site-item"
              onMouseEnter={() => setHoveredIndex(siteIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {editingIndex === siteIndex ? (
                <div className="site-editing">
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                  <TfiSave className="icon" onClick={handleSaveEdit} />
                  <FaRegWindowClose
                    className="icon"
                    onClick={() => {
                      setEditingIndex(null);
                      setHoveredIndex(null);
                    }}
                  />
                </div>
              ) : (
                <div className="site-content">
                  <p className="site-name">{site}</p>
                  {hoveredIndex === siteIndex && (
                    <div className="site-actions">
                      <FaPencilAlt
                        className="icon edit-icon"
                        onClick={() => {
                          handleEditWebsite(siteIndex, site);
                          setEditingIndex(siteIndex);
                        }}
                      />
                      <AiOutlineDelete
                        className="icon delete-icon"
                        onClick={() => onDeleteWebsite(siteIndex)}
                      />
                    </div>
                  )}
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
  onUpdateTimeRange: PropTypes.func.isRequired,
  onToggleSectionLock: PropTypes.func.isRequired,
  onLockMethodChange: PropTypes.func.isRequired,
  onLockSubmit: PropTypes.func.isRequired,
  onUnlockSection: PropTypes.func.isRequired,
  onSectionUpdate: PropTypes.func.isRequired,
};
