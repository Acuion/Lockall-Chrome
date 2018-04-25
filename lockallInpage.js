$(document).ready(function() {
    $('<div id="lockallQrBackground"><a href="#" class="lockallClose"/></div><div id="lockallQr"></div>').appendTo(document.body);
    $('.lockallClose').click(lockallSystemClose)
});

function urlDomain() {
    let a = document.createElement('a');
    a.href = window.location.href;
    return a.hostname;
}

var lockallFocusedElement;

function lockallSystemShow(prefix, base64body) {
    console.log("SHOW");
    lockallFocusedElement = document.activeElement;

    let fullQrContent = 'LOCKALL:PLUGIN' + prefix + ':' + urlDomain() + ':' + base64body;
    $('#lockallQr').html('');
    $('#lockallQr').qrcode({width: 256, height: 256, text: fullQrContent});
    $('#lockallQr').show();
    $('#lockallQrBackground').show();
}

function lockallSystemClose() {
    console.log("CLOSE");
    lockallFocusedElement.focus();
    $('#lockallQr').hide();
    $('#lockallQrBackground').hide();
}