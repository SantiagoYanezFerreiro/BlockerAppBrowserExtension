import { useState, useEffect } from "react";
import BlockedSitesSection from "./BlockedSitesSection";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get(["sections"], function (result) {
      if (result.sections) {
        setSections(result.sections);
      }
    });
  }, []);
  // Assuming you're using Chrome storage sync
  useEffect(() => {
    chrome.storage.sync.set({ sections: sections });
  }, [sections]);

  const addSection = (title) => {
    setSections([...sections, { title, sites: [] }]);
  };

  const editSectionTitle = (index, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[index].title = newTitle;
    setSections(updatedSections);
  };

  const addWebsiteToSection = (sectionIndex, website) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sites.push(website);
    setSections(updatedSections);

    chrome.storage.sync.set({ sections: updatedSections }, function () {
      if (chrome.runtime.lastError) {
        console.error("Error saving data", chrome.runtime.lastError);
      } else {
        console.log("blocked sites have been updated");
      }
    });
  };

  const editWebsiteInSection = (sectionIndex, websiteIndex, newWebsite) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sites[websiteIndex] = newWebsite;
    setSections(updatedSections);
  };

  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const deleteWebsiteFromSection = (sectionIndex, websiteIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sites.splice(websiteIndex, 1);
    setSections(updatedSections);

    chrome.storage.sync.set({ sections: updatedSections }, function () {
      console.log("website has been deleted");
    });
  };

  const openModal = (index) => setActiveModalIndex(index);
  const closeModal = () => setActiveModalIndex(null);

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
      <button onClick={() => addSection(`Section${sections.length + 1}`)}>
        Add Section
      </button>
    </div>
  );
}
