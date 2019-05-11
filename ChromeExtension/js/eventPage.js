function enablePopup(tab) {
    chrome.pageAction.show(tab.id);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event === "enablePopup") {
        onCurrentTab(enablePopup);
    }
});