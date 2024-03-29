chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed/updated");
});

//Clear restart locks when the browser starts.
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local(null, (items) => {
    const keysToRemove = Object.keys(items).filter((key) =>
      key.startsWith("restartLock")
    );
    chrome.storage.local.remove(keysToRemove, () => {
      console.log("all restart locks cleared");
    });
  });
});
