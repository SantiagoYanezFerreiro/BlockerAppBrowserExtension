chrome.storage.sync.get("sections", (data) => {
  const currentSite = window.location.hostname;
  const blockedSites = data.sections
    ? data.sections.flatMap((section) => section.sites)
    : [];
  console.log("Content script loaded", blockedSites);

  if (blockedSites.includes(currentSite)) {
    window.location.href = "https://www.google.com";
  }
});
