$(function() {
    $('#btn_check').click(function() { checkCurrentTab(); });
});

function checkCurrentTab() {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        var url = tabs[0].url;
        console.log("checkCurrentTab: " + url);
        $(".pg_url").text(url);

        // request content_script to retrieve title element innerHTML from current tab
        chrome.tabs.sendMessage(tabs[0].id, "getHeadTitle", null, function(obj) {
            console.log("getHeadTitle.from content_script:", obj);
            log("from content_script:" + obj);
        });

    });
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.windows.getCurrent(function(currentWindow) {
        chrome.tabs.query({ active: true, windowId: currentWindow.id }, function(activeTabs) {
            // inject content_script to current tab
            chrome.tabs.executeScript(activeTabs[0].id, { file: 'content_script.js', allFrames: false });
        });
    });
});

function log(txt) {
    var h = $("#log").html();
    $("#log").html(h + "<br>" + txt);
}