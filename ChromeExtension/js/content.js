function metaTag(id, tag) {
    return $(`meta[${id}="${tag}"]`).attr('content');
}

function og(tag) {
    return metaTag("property", 'og:' + tag);
}

function meta(tag) {
    return metaTag("name", tag);
}

function strip(title) {
    if (title !== undefined) {
        return title.split(/[-|–:.]+/)[0]
    }
}

sendEvent("enablePopup"); // Enable extension only for matching schema (http/https)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event === "getMetaInfo") {
        let currentTab = request.tab;
        let response = {
            title: og("site_name") || strip(currentTab.title || og("title")),
            description: meta("description") || og("description"),
            image: og("image"),
            url: og("url") || currentTab.url
        };
        sendResponse(response);
    }
    return true; // async response
});