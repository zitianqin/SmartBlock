export const redirectExtensionPath = "/src/pages/blocked/index.html";

// Rule to block Google
const BLOCK_RULE = {
  id: 1,
  action: {
    type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
    redirect: {
      extensionPath: redirectExtensionPath,
    },
  },
  condition: {
    urlFilter: `||google.com`,
    resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
  },
};

// Add blocking rule
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [BLOCK_RULE.id],
  addRules: [BLOCK_RULE],
});

// Store rule in local storage
chrome.storage.local.set({
  blocked_sites: [`||google.com`],
});
