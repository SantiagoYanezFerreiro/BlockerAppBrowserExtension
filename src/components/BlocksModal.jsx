import { useState } from "react";
import PropTypes from "prop-types";

export default function BlocksModal({
  closeModal,
  section,
  addWebsitesToSection,
  editWebsitesInSection,
  deleteWebsiteFromSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");

  const handleAddWebsite = () => {
    addWebsitesToSection(section.index, newWebsite);
    setNewWebsite("");
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-content"></div>
      <span className="model-close" onClick={closeModal}>
        &times;
      </span>
      <h2>Edit Sites for {section.title}</h2>
      <div className="modal-setion">
        <input
          type="text"
          placeholder="Enter Website URL.."
          value={newWebsite}
          onChange={(e) => setNewWebsite(e.target.value)}
        />
        <button onClick={handleAddWebsite}>Add</button>
      </div>
      <ul>
        {section.sties.map((site, index) => {
          <li key={index}>
            {site}
            <button
              onClick={() => editWebsitesInSection(section.index, index, site)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteWebsiteFromSection(section.index, index)}
            ></button>
          </li>;
        })}
      </ul>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

BlocksModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  section: PropTypes.Object.isRequired,
  addWebsitesToSection: PropTypes.func.isRequired,
  editWebsitesInSection: PropTypes.func.isRequired,
  deleteWebsiteFromSection: PropTypes.func.isRequired,
};
