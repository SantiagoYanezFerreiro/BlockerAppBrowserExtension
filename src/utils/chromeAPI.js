const isChromeExtension = () => {
  return typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync;
};

//get Data

export const getFromStorage = (key, callback) => {
  if (isChromeExtension()) {
    chrome.storage.sync.get(ket, callback);
  } else {
    const data = localStorage.getItem(key);
    callback({ [key]: data ? JSON.parse(data) : null });
  }
};

export const saveToStorage = (data, callback) => {
  if (isChromeExtension()) {
    chrome.storage.sync.set(data, callback);
  } else {
    const key = Object.keys(data)[0];
    localStorage.setItem(key, JSON.stringify(data[key]));
    if (typeof callback === "function") {
      callback();
    }
  }
};
