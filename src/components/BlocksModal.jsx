import { useState } from "react";
import PropTypes from "prop-types";

export default function BlocksModal({
  closeModal,
  section,
  addWebsitesToSection,
  editWebsitesInSection,
  deleteWebsiteFromSection,
}) {
  const [newWebsite, setNewWebsite] = React.useState("");

  const handleAddWebsite = () => {
    addWebsitesToSection(section.index, newWebsite);
    setNewWebsite("");
  };
}

BlocksModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  section: PropTypes.Object.isRequired,
  addWebsitesToSection: PropTypes.func.isRequired,
  editWebsitesInSection: PropTypes.func.isRequired,
  deleteWebsiteFromSection: PropTypes.func.isRequired,
};
