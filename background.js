var menuItem = {
    "id": "generateCpf",
    "title": "Gerar CPF",
    "contexts": ["editable"],
};

chrome.contextMenus.create(menuItem);


chrome.contextMenus.onClicked.addListener(function(info, tab){   
    chrome.tabs.sendMessage(tab.id, "getClickedEl", {frameId: info.frameId}, async (data) => {
        let cpf = fetch("https://www.4devs.com.br/ferramentas_online.php", {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-url-encoded', 'Accept': 'application/json'},
            body: "acao=gerar_cpf&pontuacao=S&cpf_estado="
        }).then(data => {
            console.log(data)
        });
        console.log(cpf)
    });
});
