const label = {
    "id": "fake_data",
    "title": "Geradores",
    "contexts": ["editable"],
};


const cpfItem = {
    title: "CPF",
    contexts:["editable"],
    parentId: "fake_data",
    id: "gerar_cpf",
}

const cardItem = {
    title: "Cartão de crédito",
    contexts:["editable"],
    parentId: "fake_data",
    id: "gerar_cc",
}

chrome.contextMenus.create(label);
chrome.contextMenus.create(cpfItem);
chrome.contextMenus.create(cardItem);

chrome.contextMenus.onClicked.addListener(function(info, tab) {   

    chrome.tabs.sendMessage(tab.id, {event: "getClickedEl"}, {frameId: info.frameId}, async (data) => {
        const url = "https://www.4devs.com.br/ferramentas_online.php";

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
            let responseData = xhr.responseText;

            if(info.menuItemId == 'gerar_cc') {
                responseData = getCCNumberFromResponse(xhr.responseText);
            }
            chrome.tabs.sendMessage(tab.id,  {event: "getDataResponse", value: responseData}, {frameId: info.frameId})
           }};
        
        
        const options = info.menuItemId == 'gerar_cc' ? `acao=${info.menuItemId}&pontuacao=S&bandeira=master`:  `acao=${info.menuItemId}&pontuacao=S&`;
        
        xhr.send(options);

        
    });
});

function getCCNumberFromResponse (html) {
    const parser = new DOMParser()
    const htmlParsed = parser.parseFromString (html, "text/html");

    const cc = htmlParsed.getElementById("cartao_numero").innerText

    return cc
}