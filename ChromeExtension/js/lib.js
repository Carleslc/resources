function onCurrentTab(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        callback(tabs[0]);
    });
}

function sendEvent(event) {
    chrome.runtime.sendMessage({ event: event });
}