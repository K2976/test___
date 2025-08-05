// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (
//     changeInfo.status === "complete" &&
//     tab.url &&
//     tab.url.includes("www.msftconnecttest.com") &&
//     chrome.scripting
//   ) {
//     chrome.scripting.executeScript({
//       target: { tabId },
//       files: ["content.js"]
//     });
//   }
// });
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && 
      tab.url.includes("192.168.4.1") || tab.url.includes("www.msftconnecttest.com")) {
      chrome.scripting.executeScript({
          target: { tabId },
          files: ["content.js"]
      });
  }
});