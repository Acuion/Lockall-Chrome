'use strict';

function makeWsConnection() {
    var lockallConnection = new WebSocket("ws://127.0.0.1:42587/Lockall"); // todo

    lockallConnection.onmessage = function(event) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currTabId = tabs[0].id;
            let split = event.data.split(':');
            let command = split[0];
            switch (command) {
                case "SHOW":
                    chrome.tabs.executeScript(currTabId, {code: `lockallSystemShow("${split[1]}", "${split[2]}")`}); // prefix and qr body
                break;
                case "CLOSE":
                    chrome.tabs.executeScript(currTabId, {code: "lockallSystemClose()"});
                break;
            }
        });
    };

    lockallConnection.onclose = function(e) {
        setTimeout(makeWsConnection, 1000);
    };
    
    lockallConnection.onerror = function(err) {
        setTimeout(makeWsConnection, 1000);
    };
}

makeWsConnection();