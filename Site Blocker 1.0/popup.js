document.getElementById('blockSiteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const siteUrl = document.getElementById('siteUrl').value;
    document.getElementById('confirmation').style.display = 'block';

    document.getElementById('confirmYes').onclick = function() {
        const siteCode = Math.random().toString(36).substr(2, 9);
        chrome.storage.local.get({ blockedSites: [] }, function(result) {
            const blockedSites = result.blockedSites;
            blockedSites.push({ url: siteUrl, code: siteCode });
            chrome.storage.local.set({ blockedSites: blockedSites }, function() {
                alert('Site blocked: ' + siteUrl + '\nCode: ' + siteCode);
                document.getElementById('confirmation').style.display = 'none';
                updateBlockedSites();
            });
        });
    };

    document.getElementById('confirmNo').onclick = function() {
        document.getElementById('confirmation').style.display = 'none';
    };
});

function updateBlockedSites() {
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
}

document.addEventListener('DOMContentLoaded', updateBlockedSites);
