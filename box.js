var fecharButton = document.getElementById('fechar');
var linkButton = document.getElementById('linkSisref');
var mensagem = document.getElementById('mensagem');
var agora = new Date();
var horas = formataNumero(agora.getHours());
var minutos = formataNumero(agora.getMinutes());
mensagem.innerHTML = "São " + horas + ":" + minutos + "! Já registrou sua frequência?"

var endereco = browser.runtime.getURL('sounds/galo.wav');
console.log(endereco);

alarmSound = new Audio(endereco);
//a.play();
var playPromise = alarmSound.play();

if (playPromise !== undefined) {
  playPromise.then(_ => {
    // Automatic playback started!
    // Show playing UI.
  })
  .catch(error => {
    // Auto-play was prevented
    // Show paused UI.
  });
}

// Botão "Fechar" fecha a caixa
fecharButton.addEventListener('click', function() {
  console.log('Botao fechar');
  alarmSound.pause();
  var winId = browser.windows.WINDOW_ID_CURRENT;
  var removing = browser.windows.remove(winId);

});

// Botão "Link" também fecha a caixa
linkButton.addEventListener('click', function() {
  console.log('Botao Link');
  var winId = browser.windows.WINDOW_ID_CURRENT;
  var removing = browser.windows.remove(winId);
});