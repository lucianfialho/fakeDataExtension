var menuItem = {
    "id": "generateCpf",
    "title": "Gerar CPF",
    "contexts": ["editable"],
};

chrome.contextMenus.create(menuItem);


chrome.contextMenus.onClicked.addListener(function(info, tab){   
    chrome.tabs.sendMessage(tab.id, "getClickedEl", {frameId: info.frameId}, data => {
        elt.value = data.value;
    });
});
