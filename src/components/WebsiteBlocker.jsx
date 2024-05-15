import { useState, useEffect } from "react";
import BlockedSitesSection from "./BlockedSitesSection";
import { getFromStorage, saveToStorage } from "../utils/chromeAPI";
import PropTypes from "prop-types";
import "../WebsiteBlocker.css";
import { VscDiffAdded } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";

export default function WebsiteBlocker({ sections, setSections }) {
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [isAddingNewSection, setIsAddingNewSection] = useState(false);

  useEffect(() => {
    console.log("Sections updated:", sections);
  }, [sections]);

  useEffect(() => {
    const initialSectionStructure = {
      enabled: true,
      locked: false,
      lockMethod: null,
      timeRange: {
        startTime: "",
        endTime: "",
      },
    };
    // Load sections from storage when the component mounts
    getFromStorage(["sections"], (result) => {
      const updatedSections =
        result.sections?.map((section) => ({
          ...initialSectionStructure,
          ...section,
        })) || [];
      setSections(updatedSections);
    });
  }, [setSections]);

  // Function to add a new section
  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      console.log("Adding new section:", newSectionTitle);
      const newSections = [
        ...sections,
        {
          title: newSectionTitle,
          sites: [],
          enabled: true,
          locked: false,
          lockMethod: null,
          lockValue: "",
          timeRange: {
            startTime: "09:00",
            endTime: "23:59",
          },
        },
      ];
      console.log("New sections state:", newSections);
      setSections(newSections);
      saveToStorage({ sections: newSections });
      setNewSectionTitle("");
      setIsAddingNewSection(false);
    }
  };

  const handleSectionsUpdate = (updatedSection, index) => {
    const newSections = sections.map((section, idx) =>
      idx === index ? updatedSection : section
    );
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
    saveToStorage({ sections: newSections });
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
  const addWebsiteToSection = (sectionIndex, websiteName) => {
    console.log("Received websiteName:", websiteName); // Log the website name received
    console.log("Type of received websiteName:", typeof websiteName);
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        const newWebsite = {
          id: uuidv4(),
          name: String(websiteName),
        };
        console.log("New website object:", newWebsite);
        return { ...section, sites: [...section.sites, newWebsite] };
      }
      return section;
    });
    console.log("Updated sections before setting state:", updatedSections); // Log updated sections before setting state
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
      console.log("Updated sections:", updatedSections);
    });
  };

  // Function to edit a website within a section
  // Adjust the function to handle edits based on unique IDs
  const editWebsiteInSection = (sectionIndex, websiteId, newWebsiteName) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        const updatedSites = section.sites.map((site) => {
          return site.id === websiteId
            ? { ...site, name: newWebsiteName }
            : site;
        });
        return { ...section, sites: updatedSites };
      }
      return section;
    });
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

  // Function to delete a website from a section
  const deleteWebsiteFromSection = (sectionIndex, websiteId) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        const filteredSites = section.sites.filter(
          (site) => site.id !== websiteId
        );
        return { ...section, sites: filteredSites };
      }
      return section;
    });
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };
  // Adjust the function to handle deletes based on unique IDs
  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections }, () => {
      console.log("sections saved correctly");
    });
  };
  const updateTimeRange = (sectionIndex, newTimeRange) => {
    const updatedSections = sections.map((section, idx) =>
      idx === sectionIndex ? { ...section, timeRange: newTimeRange } : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
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

  return (
    <div className="blocker-container">
      <h1>Blocks</h1>
      {sections.map((section, index) => (
        <BlockedSitesSection
          key={section.id || index}
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
          onUpdateTimeRange={(newTimeRange) =>
            updateTimeRange(index, newTimeRange)
          }
        />
      ))}

      {isAddingNewSection ? (
        <div>
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter Section Title"
          />
          <div className="icon-button" onClick={handleAddSection}>
            <VscDiffAdded className="icon-website-blocker" />
          </div>
        </div>
      ) : (
        <div onClick={() => setIsAddingNewSection(true)}>
          <VscDiffAdded className="icon-website-blocker" />
        </div>
      )}
    </div>
  );
}

WebsiteBlocker.propTypes = {
  sections: PropTypes.array.isRequired,
  setSections: PropTypes.func.isRequired,
  updateSections: PropTypes.func.isRequired,
};
