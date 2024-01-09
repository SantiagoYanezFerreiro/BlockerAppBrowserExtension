chrome.storage.sync.get("blockedSites", (data) => {
  const currentSite = window.location.hostname;
  const blockedSites = data.blockedSites || [];

  if (blockedSites.includes(currentSite)) {
    window.location.href = "https://www.google.com";
  }
});
