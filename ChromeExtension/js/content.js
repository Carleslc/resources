function metaTag(id, tag) {
    return $(`meta[${id}="${tag}"]`).attr('content');
}

function og(tag) {
    return metaTag("property", 'og:' + tag);
}

function meta(tag) {
    return metaTag("name", tag);
}

sendEvent("enablePopup"); // Enable extension only for matching schema (http/https)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event === "getMetaInfo") {
        let currentTab = sender.tab;
        let response = {
            title: og("site_name") || currentTab.title,
            description: meta("description") || og("description"),
            url: og("url") || currentTab.url
        };
        sendResponse(response);
    }
    return true; // async response
});