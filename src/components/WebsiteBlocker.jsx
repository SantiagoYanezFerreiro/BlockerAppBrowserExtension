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
    const initialSectionStructure = {
      enabled: true,
      locked: false,
      lockMethod: null,
      timeRange: {
        startTime: "",
        endTime: "",
      },
      noBreak: "noBreak",
      pomodoroWorkTime: 25,
      pomodoroBreakTime: 5,
      allowanceTime: 0,
    };
    getFromStorage(["sections"], (result) => {
      const updatedSections =
        result.sections?.map((section) => ({
          ...initialSectionStructure,
          ...section,
        })) || [];
      setSections(updatedSections);
    });
  }, [setSections]);

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
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
          noBreak: "noBreak",
          pomodoroWorkTime: 25,
          pomodoroBreakTime: 5,
          allowanceTime: 0,
        },
      ];
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

  const editSectionTitle = (index, newTitle) => {
    const updatedSections = sections.map((section, idx) =>
      idx === index ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

  const addWebsiteToSection = (sectionIndex, websiteName) => {
    if (typeof websiteName !== "string") {
      console.error("Received websiteName is not a string, converting...");
      websiteName = String(websiteName);
    }

    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        const newWebsite = {
          id: uuidv4(),
          name: websiteName,
        };
        return { ...section, sites: [...section.sites, newWebsite] };
      }
      return section;
    });
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

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

  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

  const duplicateSection = (index) => {
    const sectionToDuplicate = sections[index];
    const duplicatedSection = {
      ...sectionToDuplicate,
      id: uuidv4(),
      title: `${sectionToDuplicate.title} Copy`,
      sites: sectionToDuplicate.sites.map((site) => ({
        ...site,
        id: uuidv4(),
      })),
    };
    const updatedSections = [...sections, duplicatedSection];
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
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

  const handlePomodoroTimesChange = (
    index,
    pomodoroWorkTime,
    pomodoroBreakTime
  ) => {
    const updatedSections = sections.map((section, idx) =>
      idx === index
        ? { ...section, pomodoroWorkTime, pomodoroBreakTime }
        : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
  };

  const handleAllowanceTimeChange = (index, allowanceTime) => {
    const updatedSections = sections.map((section, idx) =>
      idx === index ? { ...section, allowanceTime } : section
    );
    setSections(updatedSections);
    saveToStorage({ sections: updatedSections });
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
          onAddWebsite={(website) => {
            addWebsiteToSection(index, website);
          }}
          onEditWebsite={(websiteId, newWebsite) => {
            editWebsiteInSection(index, websiteId, newWebsite);
          }}
          onDeleteWebsite={(websiteId) => {
            deleteWebsiteFromSection(index, websiteId);
          }}
          onDuplicateSection={() => {
            duplicateSection(index);
          }}
          onEditSectionTitle={(newTitle) => editSectionTitle(index, newTitle)}
          onDeleteSection={() => deleteSection(index)}
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
};
