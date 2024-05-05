chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed/updated", details.reason);
  if (details.reason === "install") {
    // Set default values or perform initial setup
    chrome.storage.sync.set({ sections: [] }, () => {
      if (chrome.runtime.lastError) {
        console.error(
          `Error setting initial sections: ${chrome.runtime.lastError.message}`
        );
      }
    });
  }
});
