const RESOURCES_URL = "https://airtable.com/shrnzLIolsKJMD9Ql";
const THUMBNAIL_URL = "https://api.thumbnail.ws/api/abd0c3864495e337e453a3795c676a9ead164b1b3030/thumbnail/get";

function getUrl(baseUrl, params) {
    return baseUrl + '?' + $.param(params);
}

function thumbnail(url) {
    return getUrl(THUMBNAIL_URL, { url: url, width: 720 })
}

function setStatus(message) {
    let status = $('#status');
    status.text(message);
    status.show();
    status.delay(2000).slideUp(500, status.hide);
}

function copyToClipboard(url) {
    document.addEventListener('copy', function copyUrlAsPlainText(e) {
        e.clipboardData.setData('text/plain', url);
        e.preventDefault();
        document.removeEventListener('copy', copyUrlAsPlainText);
    });
    if (document.execCommand('copy')) {
        setStatus("Image URL copied to clipboard!");
    } else {
        setStatus("Failed to copy, use this URL: " + url);
    }
}

function addResource(title, link, description) {
    let params = {};

    function addParam(name, value) {
        if (value) {
            params[name] = value.trim()
        }
    }
    addParam('prefill_Title', title);
    addParam('prefill_Link', link);
    addParam('prefill_Description', description);
    chrome.tabs.create({ url: getUrl(RESOURCES_URL, params) });
}

function loadMetaInfo(currentTab) {
    chrome.tabs.sendMessage(currentTab.id, { event: "getMetaInfo", tab: currentTab }, function(response) {
        $('#site-title').text(response.title);
        $('#site-description').text(response.description);
        let imageUri = response.image || thumbnail(response.url);
        $('#site-thumbnail').attr('src', imageUri);
        $('#site-thumbnail-overlay').click(function() {
            copyToClipboard(imageUri);
        });
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