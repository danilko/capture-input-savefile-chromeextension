// When the button is clicked, inject setPageBackgroundColor into current page
capture.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Call the embedded script that inject as part of content.js
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['inject.js'],
    });
});