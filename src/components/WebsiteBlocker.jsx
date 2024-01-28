import { useState, useEffect } from "react";
import BlockedSitesSection from "./BlockedSitesSection";
import { getFromStorage, saveToStorage } from "./chromeAPI";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Load sections from storage when the component mounts
  useEffect(() => {
    getFromStorage(["sections"], (result) => {
      console.log("Retrieved sections", result.sections);
      if (result.sections) {
        setSections(result.sections);
      }
    });
  }, []);

  // Function to add a new section
  const addSection = (title) => {
    const newSections = [...sections, { title, sites: [] }];
    setSections(newSections);
    saveToStorage({ sections: newSections }, () => {
      console.log("sections saved correctly");
    });
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
