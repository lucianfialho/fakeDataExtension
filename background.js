chrome.runtime.onInstalled.addListener(async () => {

    chrome.contextMenus.create({
        "id" : "Some id",
        "title" : "My Context Menu",
        "contexts": ["editable"]
    })
    
    const currentTab = await getCurrentTab()

    chrome.scripting.executeScript(
    {
        target: {tabId: currentTab.id},
        files: ['script.js'],
    });
    chrome.contextMenus.onClicked.addListener(tab => {
        
    })
});

function showAlert() {
    alert("test!");
  }

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
