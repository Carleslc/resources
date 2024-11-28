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

async function copyToClipboard(url) {
    try {
        await navigator.clipboard.writeText(url);
        setStatus("Image URL copied to clipboard!");
    } catch (err) {
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

async function loadMetaInfo(currentTab) {
    try {
        const response = await chrome.tabs.sendMessage(currentTab.id, { 
            event: "getMetaInfo", 
            tab: currentTab 
        });
        
        $('#site-url').text(response.url);
        $('#site-title').text(response.title);
        $('#site-description').text(response.description);

        const imageUri = response.image || thumbnail(response.url);
        $('#site-thumbnail').attr('src', imageUri);
        $('#site-thumbnail-overlay').click(() => copyToClipboard(imageUri));

        $('#add-btn').click(() => addResource(response.title, response.url, response.description));
        $('#add-btn').prop("disabled", false);
    } catch (error) {
        console.error('Error loading meta info:', error);
        setStatus('Error loading page meta info');
    }
}

$(function() {
    onCurrentTab(loadMetaInfo);
});
