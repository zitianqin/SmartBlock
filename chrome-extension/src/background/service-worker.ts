export const redirectExtensionPath = "/src/pages/blocked/index.html";

// // Function to check if site is temporarily unblocked
// async function isTemporarilyUnblocked(url: string) {
//   const hostname = new URL(url).hostname;
//   const result = await chrome.storage.local.get(`temp_unblock_${hostname}`);
//   const expiryTime = result[`temp_unblock_${hostname}`];

//   if (expiryTime && Date.now() < expiryTime) {
//     return true;
//   }

//   // Clean up expired entry
//   if (expiryTime) {
//     await chrome.storage.local.remove(`temp_unblock_${hostname}`);
//   }
//   return false;
// }

// // When blocking a site, store its URL with the tab ID
// chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener(async (info) => {
//   const tabId = info.request.tabId;
//   const originalUrl = info.request.url;

//   console.log("Blocking URL:", originalUrl);

//   // Check if site is temporarily unblocked
//   if (await isTemporarilyUnblocked(originalUrl)) {
//     return; // Allow access if temporarily unblocked
//   }

//   // Store URL with tab ID as key if blocked
//   chrome.storage.local.set({
//     [`blocked_url_${tabId}`]: originalUrl,
//   });
// });

// Add helper function for checking unblock status
function checkUnblockStatus(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const hostname = new URL(url).hostname;
    chrome.storage.local.get(`temp_unblock_${hostname}`, (result) => {
      const expiryTime = result[`temp_unblock_${hostname}`];
      if (expiryTime && Date.now() < expiryTime) {
        resolve(true);
      } else {
        if (expiryTime) {
          chrome.storage.local.remove(`temp_unblock_${hostname}`);
        }
        resolve(false);
      }
    });
  });
}

// Modified listener with synchronous response
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Store URL with tab ID
    chrome.storage.local.set({
      [`blocked_url_${details.tabId}`]: details.url,
    });

    // Check unblock status separately
    checkUnblockStatus(details.url).then((isUnblocked) => {
      if (isUnblocked) {
        return { cancel: false };
      }
    });

    // Return synchronous blocking response
    return {
      redirectUrl: chrome.runtime.getURL(
        redirectExtensionPath + `?url=${encodeURIComponent(details.url)}`
      ),
    };
  },
  {
    urls: ["*://www.google.com/*"],
    types: ["main_frame"],
  },
  ["blocking"]
);

// Optional: Add alarm to clean up expired unblocks
chrome.alarms.create("cleanupExpiredUnblocks", { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "cleanupExpiredUnblocks") {
    const storage = await chrome.storage.local.get(null);
    const now = Date.now();

    for (const [key, value] of Object.entries(storage)) {
      if (key.startsWith("temp_unblock_") && value < now) {
        await chrome.storage.local.remove(key);
      }
    }
  }
});

// // Rule to block Google
// const BLOCK_RULE = {
//   id: 1,
//   action: {
//     type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
//     redirect: {
//       extensionPath: redirectExtensionPath,
//     },
//   },
//   condition: {
//     urlFilter: `||google.com`,
//     resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
//   },
// };

// // Add blocking rule
// chrome.declarativeNetRequest.updateDynamicRules({
//   removeRuleIds: [BLOCK_RULE.id],
//   addRules: [BLOCK_RULE],
// });

// Store rule in local storage
chrome.storage.local.set({
  blocked_sites: [`||google.com`],
});
