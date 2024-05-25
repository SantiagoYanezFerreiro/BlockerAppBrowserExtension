import { useState } from "react";
import PropTypes from "prop-types";

export default function BlocksModal({
  closeModal,
  section,
  addWebsitesToSection,
  editWebsiteInSection,
  deleteWebsiteFromSection,
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editingWebsiteId, setEditingWebsiteId] = useState(null);
  const [editingWebsiteName, setEditingWebsiteName] = useState("");

  console.log("Current section in BlocksModal:", section);

  const handleAddWebsite = () => {
    console.log("Attempting to add website in BlocksModal:", newWebsite);
    console.log(
      "Type of newWebsite before adding in BlocksModal:",
      typeof newWebsite
    );
    const websiteString = newWebsite.trim(); // Trim whitespace from input
    console.log("Website as string in BlocksModal:", websiteString);
    if (websiteString) {
      console.log("Calling addWebsitesToSection with:", websiteString);
      addWebsitesToSection(websiteString); // Pass only the website string
      setNewWebsite(""); // Clear the input field
    } else {
      console.error("No website name entered");
    }
  };

  const handleEditWebsite = () => {
    console.log(
      "Editing website in BlocksModal:",
      editingWebsiteId,
      editingWebsiteName
    );
    editWebsiteInSection(editingWebsiteId, editingWebsiteName);
    setEditingWebsiteId(null);
    setEditingWebsiteName("");
  };

  const handleDeleteWebsite = (websiteId) => {
    console.log("Deleting website in BlocksModal:", websiteId);
    deleteWebsiteFromSection(websiteId);
  };

  const startEditingWebsite = (websiteId, websiteName) => {
    setEditingWebsiteId(websiteId);
    setEditingWebsiteName(websiteName);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content"></div>
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
            {editingWebsiteId === site.id ? (
              <div>
                <input
                  type="text"
                  value={editingWebsiteName}
                  onChange={(e) => setEditingWebsiteName(e.target.value)}
                />
                <button onClick={handleEditWebsite}>Save</button>
                <button onClick={() => setEditingWebsiteId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {site.name}
                <button onClick={() => startEditingWebsite(site.id, site.name)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteWebsite(site.id)}>
                  Delete
                </button>
              </div>
            )}
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
  addWebsitesToSection: PropTypes.func.isRequired,
  editWebsiteInSection: PropTypes.func.isRequired,
  deleteWebsiteFromSection: PropTypes.func.isRequired,
};
