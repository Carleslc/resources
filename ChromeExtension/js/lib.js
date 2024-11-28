async function onCurrentTab(callback) {
    const [tab] = await chrome.tabs.query({ 
        active: true, 
        currentWindow: true 
    });
    return callback(tab);
}

function sendEvent(event) {
    return chrome.runtime.sendMessage({ event: event });
}
