chrome.contextMenus.create({
    "id" : "Some id",
    "title" : "My Context Menu",
    "contexts": ["editable"]
})
  
chrome.contextMenus.onClicked.addListener(function(clickData, tab){
    console.log(clickData)
})