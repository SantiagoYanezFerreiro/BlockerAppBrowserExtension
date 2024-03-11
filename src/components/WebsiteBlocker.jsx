import { useState, useEffect } from "react";
import BlockedSitesSection from "./BlockedSitesSection";
import { getFromStorage, saveToStorage } from "../utils/chromeAPI";
import PropTypes from "prop-types";
import "../WebsiteBlocker.css";
import { VscDiffAdded } from "react-icons/vsc";

export default function WebsiteBlocker({ sections, setSections }) {
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [isAddingSection, setIsAddingNewSection] = useState(false);
  // Load sections from storage when the component mounts
  useEffect(() => {
    getFromStorage(["sections"], (result) => {
      const updatedSections =
        result.sections?.map((section) => ({
          ...section,
          enabled: section.enabled ?? true,
          locked: section.locked ?? false,
          lockMethod: section.lockMethod ?? null,
        })) || [];
      setSections(updatedSections);
    });
  }, [setSections]);

  const handleSectionsUpdate = (updatedSection, index) => {
    const newSections = sections.map((section, idx) =>
      idx === index ? updatedSection : section
    );
    setSections(newSections);
    saveToStorage({ sections: newSections });
  };

  // Function to add a new section
  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      const newSections = [
        ...sections,
        {
          title: newSectionTitle,
          sites: [],
          enabled: true,
          locked: true,
          lockMethod: null,
          lockValue: "",
        },
      ];
      setSections(newSections);
      saveToStorage({ sections: newSections });
      setNewSectionTitle("");
      setIsAddingNewSection(false);
    }
  };

  // Function to edit a section title
  const editSectionTitle = (index, newTitle) => {
    const updatedSections = sections.map((section, idx) =>
      idx === index ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
    });
  };

  // Function to add a website to a section
  const addWebsiteToSection = (sectionIndex, website) => {
    const updatedSections = sections.map((section, idx) =>
      idx === sectionIndex
        ? { ...section, sites: [...section.sites, website] }
        : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
    });
  };

  // Function to edit a website within a section
  const editWebsiteInSection = (sectionIndex, websiteIndex, newWebsite) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        const updatedSites = section.sites.map((site, sIdx) => {
          return sIdx === websiteIndex ? newWebsite : site;
        });
        return { ...section, sites: updatedSites };
      }
      return section;
    });
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
    });
  };

  // Function to delete a section
  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
    });
  };

  // Function to delete a website from a section
  const deleteWebsiteFromSection = (sectionIndex, websiteIndex) => {
    const updatedSections = sections.map((section, idx) =>
      idx === sectionIndex
        ? {
            ...section,
            sites: section.sites.filter((_, sIdx) => sIdx !== websiteIndex),
          }
        : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
    });
  };

  const toggleModal = (index) => {
    setActiveModalIndex(activeModalIndex === index ? null : index);
  };

  const toggleSectionEnabled = (index) => {
    const updatedSections = [...sections];
    const section = updatedSections[index];
    if (section.locked) {
      console.log("section locked", section.lockMethod);
    } else {
      section.enabled = !section.enabled;
      setSections(updatedSections);
      saveToStorage({ sections: updatedSections });
    }
  };

  const toggleSectionLock = (index) => {
    const updatedSections = [...sections];
    const section = updatedSections[index];
    section.locked = !section.locked;

    if (section.locked && !section.lockMethod) {
      section.lockMethod = "password";
    } else if (!section.locked && section.lockMethod !== "randomText") {
      section.lockValue = "";
    }
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

  const onLockSubmit = (index, lockMethod, lockValue) => {
    const newSections = sections.map((section, idx) => {
      if (idx === index) {
        return { ...section, lockMethod, lockValue };
      }
      return section;
    });
    setSections(newSections);
    saveToStorage({ sections: newSections });
  };

  const handleLockMethodChange = (sectionIndex, lockMethod) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lockMethod = lockMethod;
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

  const handleUnlockSection = (index) => {
    const newSections = sections.map((section, idx) => {
      if (idx === index) {
        return { ...section, locked: false };
      }
      return section;
    });
    setSections(newSections);
  };

  return (
    <div className="blocker-container">
      <h1>Blocks</h1>
      {sections.map((section, index) => (
        <BlockedSitesSection
          key={index}
          index={index}
          section={section}
          onSectionUpdate={(updatedSection) =>
            handleSectionsUpdate(updatedSection, index)
          }
          onToggleSectionEnabled={() => toggleSectionEnabled(index)}
          onToggleSectionLock={() => toggleSectionLock(index)}
          onLockSubmit={onLockSubmit}
          onLockMethodChange={handleLockMethodChange}
          onUnlockSection={handleUnlockSection}
          title={section.title}
          sites={section.sites}
          isModalOpen={activeModalIndex === index}
          onOpenModal={() => toggleModal(index)}
          onCloseModal={() => setActiveModalIndex(null)}
          onToggleModal={toggleModal}
          onAddWebsite={(website) => addWebsiteToSection(index, website)}
          onEditWebsite={(websiteIndex, newWebsite) =>
            editWebsiteInSection(index, websiteIndex, newWebsite)
          }
          onEditSectionTitle={(newTitle) => editSectionTitle(index, newTitle)}
          onDeleteSection={() => deleteSection(index)}
          onDeleteWebsite={(websiteIndex) =>
            deleteWebsiteFromSection(index, websiteIndex)
          }
        />
      ))}

      {isAddingSection ? (
        <div>
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter Section Title"
          />
          <VscDiffAdded
            className="icon-website-blocker"
            onClick={handleAddSection}
          />
        </div>
      ) : (
        <VscDiffAdded
          className="icon-website-blocker"
          onClick={() => setIsAddingNewSection(true)}
        >
          Add New Section
        </VscDiffAdded>
      )}
    </div>
  );
}

WebsiteBlocker.propTypes = {
  sections: PropTypes.array.isRequired,
  setSections: PropTypes.func.isRequired,
  updateSections: PropTypes.func.isRequired,
};
