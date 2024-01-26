import { useState, useEffect } from "react";
import BlockedSitesSection from "./BlockedSitesSection";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Load sections from storage when the component mounts
  useEffect(() => {
    chrome.storage.sync.get(["sections"], (result) => {
      console.log("Retrieved sections", result.sections);
      if (result.sections) {
        setSections(result.sections);
      }
    });
  }, []);

  // Helper function to save sections to storage
  const saveSectionsToStorage = (updatedSections) => {
    chrome.storage.sync.set({ sections: updatedSections }, function () {
      if (chrome.runtime.lastError) {
        console.error("Error saving data", chrome.runtime.lastError);
      } else {
        console.log("Sections saved to storage");
      }
    });
  };

  // Function to add a new section
  const addSection = (title) => {
    const newSections = [...sections, { title, sites: [] }];
    setSections(newSections);
    saveSectionsToStorage(newSections);
  };

  // Function to edit a section title
  const editSectionTitle = (index, newTitle) => {
    const updatedSections = sections.map((section, idx) =>
      idx === index ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
    saveSectionsToStorage(updatedSections);
  };

  // Function to add a website to a section
  const addWebsiteToSection = (sectionIndex, website) => {
    const updatedSections = sections.map((section, idx) =>
      idx === sectionIndex
        ? { ...section, sites: [...section.sites, website] }
        : section
    );
    setSections(updatedSections);
    saveSectionsToStorage(updatedSections);
  };

  // Function to edit a website within a section
  const editWebsiteInSection = (sectionIndex, websiteIndex, newWebsite) => {
    const updatedSections = sections.map((section, idx) =>
      idx === sectionIndex
        ? {
            ...section,
            sites: section.sites.map((site, sIdx) =>
              sIdx === websiteIndex ? newWebsite : site
            ),
          }
        : section
    );
    setSections(updatedSections);
    saveSectionsToStorage(updatedSections);
  };

  // Function to delete a section
  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    saveSectionsToStorage(updatedSections);
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
    saveSectionsToStorage(updatedSections);
  };

  // Function to handle opening the modal
  const openModal = (index) => setActiveModalIndex(index);

  // Function to handle closing the modal
  const closeModal = () => setActiveModalIndex(null);

  // JSX for the component
  return (
    <div className="blocker-container">
      <h1>Blocks</h1>
      {sections.map((section, index) => (
        <BlockedSitesSection
          key={index}
          index={index}
          title={section.title}
          sites={section.sites}
          isModalOpen={activeModalIndex === index}
          onOpenModal={() => openModal(index)}
          onCloseModal={closeModal}
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
      <button onClick={() => addSection(`Section ${sections.length + 1}`)}>
        Add Section
      </button>
    </div>
  );
}
