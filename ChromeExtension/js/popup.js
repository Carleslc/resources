const RESOURCES_URL = "https://airtable.com/shrnzLIolsKJMD9Ql";

var currentTab;

function metaTag(id, tag) {
    return $(`meta[${id}="${tag}"]`).attr('content');
}

function og(tag) {
    return metaTag("property", 'og:' + tag);
}

function meta(tag) {
    return metaTag("name", tag);
}

function getUrl(baseUrl, params) {
    return baseUrl + '?' + $.param(params);
}

function addResource(title, link, description) {
    let params = {};

    function addParam(name, value) {
        if (value) {
            params[name] = value
        }
    }
    addParam('prefill_Title', title);
    addParam('prefill_Link', link);
    addParam('prefill_Description', description);
    chrome.tabs.create({ url: getUrl(RESOURCES_URL, params) });
}

function openAddResourceForm() {
    let title = og("site_name") || currentTab.title;
    let url = og("url") || currentTab.url;
    addResource(title, url, "Description");
}

function loadMetaInfo() {
    let title = og("site_name") || currentTab.title;
    let description = meta("description") || og("description");
    let url = og("url") || currentTab.url;
    $('#site-title').text(title);
    $('#site-description').text(description);
    $('#site-url').text(url);
    $('#add-btn').prop("disabled", false);
    $('#add-btn').click(function() {
        alert('Clicked');
    });
}

$(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        currentTab = tabs[0];
        loadMetaInfo();
    });
});