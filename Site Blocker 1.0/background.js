chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
        const rules = result.blockedSites.map((site, index) => ({
            id: index + 1,
            priority: 1,
            action: { type: 'block' },
            condition: { urlFilter: site.url }
        }));
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules,
            removeRuleIds: rules.map((_, index) => index + 1)
        });
    });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.blockedSites) {
        const newSites = changes.blockedSites.newValue;
        const rules = newSites.map((site, index) => ({
            id: index + 1,
            priority: 1,
            action: { type: 'block' },
            condition: { urlFilter: site.url }
        }));
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules,
            removeRuleIds: rules.map((_, index) => index + 1)
        });
    }
});
