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
    console.log("Attempting to add website:", newWebsite); // Check what's being added
    console.log("Type of newWebsite before adding:", typeof newWebsite);
    if (newWebsite) {
      addWebsitesToSection(sectionIndex, String(newWebsite));
      setNewWebsite(""); // Clear the input field
    } else {
      console.error("No website name entered");
    }
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
          onChange={(e) => {
            console.log("Current input value:", e.target.value);
            console.log("Type of input value:", typeof e.target.value);
            setNewWebsite(e.target.value);
          }}
        />
        <button onClick={handleAddWebsite}>Add</button>
      </div>
      <ul>
        {section?.sites?.map((site, index) => (
          <li key={site.id || index}>
            {site.name}
            <button
              onClick={() =>
                editWebsiteInSection(sectionIndex, site.id, site.name)
              }
            >
              Edit
            </button>
            <button
              onClick={() => deleteWebsiteFromSection(sectionIndex, site.id)}
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
