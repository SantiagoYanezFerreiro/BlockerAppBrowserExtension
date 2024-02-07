import { useState } from "react";
import PropTypes from "prop-types";
import "../BlockedSitesSection.css";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { FaRegWindowClose } from "react-icons/fa";

export default function BlockedSitesSection({
  index,
  title,
  sites,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onAddWebsite,
  onEditWebsite,
  onEditSectionTitle,
  onDeleteSection,
  onDeleteWebsite,
}) {
  const [newWebsite, setNewWebsite] = useState("");

  const handleAddWebsite = () => {
    onAddWebsite(newWebsite);
    setNewWebsite("");
  };

  return (
    <div className="blocker-sites-section">
      <h2 className="section-name" onClick={onOpenModal}>
        {title}
      </h2>

      <ul>
        {sites.map((site, siteIndex) => (
          <li key={siteIndex} className="site-item">
            <p className="site-name">{site}</p>
            <FaPencilAlt
              className="icon"
              onClick={() =>
                onEditWebsite(siteIndex, prompt("Edit website", site))
              }
            >
              Edit
            </FaPencilAlt>

            <AiOutlineDelete
              className="icon"
              onClick={() => onDeleteWebsite(siteIndex)}
            >
              Delete{" "}
            </AiOutlineDelete>
          </li>
        ))}
      </ul>

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

              <FaRegWindowClose
                className="icon"
                sonClick={onCloseModal}
                Close
              />
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
  isModalOpen: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onAddWebsite: PropTypes.func.isRequired,
  onEditWebsite: PropTypes.func.isRequired,
  onEditSectionTitle: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
  onDeleteWebsite: PropTypes.func.isRequired,
};
