import { useState } from "react";
import PropTypes from "prop-types";

export default function BlocksModal({
  closeModal,
  section,
  sectionIndex,
  addWebsitesToSection,
  editWebsiteInSection,
  deleteWebsiteFromSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");

  console.log("Current section in BlocksModal:", section);

  const handleAddWebsite = () => {
    console.log("Adding website:", newWebsite);
    addWebsitesToSection(sectionIndex, newWebsite);
    setNewWebsite("");
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-content"></div>
      <span className="modal-close" onClick={closeModal}>
        &times;
      </span>
      <h2>Edit Sites for {section.title}</h2>
      <div className="modal-section">
        <input
          type="text"
          placeholder="Enter Website URL.."
          value={newWebsite}
          onChange={(e) => setNewWebsite(e.target.value)}
        />
        <button onClick={handleAddWebsite}>Add</button>
      </div>
      <ul>
        {section?.sites?.map((site, index) => (
          <li key={index}>
            {site}
            <button
              onClick={() => editWebsiteInSection(sectionIndex, index, site)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteWebsiteFromSection(sectionIndex, index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

BlocksModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  addWebsitesToSection: PropTypes.func.isRequired,
  editWebsiteInSection: PropTypes.func.isRequired,
  deleteWebsiteFromSection: PropTypes.func.isRequired,
};
