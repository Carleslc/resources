const RESOURCES_URL = "https://airtable.com/shrnzLIolsKJMD9Ql";

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

function loadMetaInfo(currentTab) {
    chrome.tabs.sendMessage(currentTab.id, { event: "getMetaInfo" }, function(response) {
        console.log("POPUP");
        console.log(response);
        $('#site-title').text(response.title);
        $('#site-description').text(response.description);
        $('#site-url').text(response.url);
        $('#add-btn').click(function() {
            addResource(response.title, response.url, response.description);
        });
        $('#add-btn').prop("disabled", false);
    });
}

$(function() {
    onCurrentTab(loadMetaInfo);
});