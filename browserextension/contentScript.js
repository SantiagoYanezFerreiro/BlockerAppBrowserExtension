chrome.storage.sync.get("sections", (data) => {
  if (chrome.runtime.lastError) {
    console.error(
      `Error retrieving sections: ${chrome.runtime.lastError.message}`
    );
    return;
  }

  const currentSite = window.location.hostname;
  const blockedSites = data.sections
    ? data.sections.flatMap((section) => section.sites.map((site) => site.name))
    : [];

  console.log("Content script loaded", blockedSites);

  if (blockedSites.includes(currentSite)) {
    window.location.href = "https://www.google.com";
  }
});
