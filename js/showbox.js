"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

var alarmSound;

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);

  // Caixa de diálogo para exibir a mensagem
  var caixa = document.createElement('dialog');
  caixa.setAttribute('id', 'alarmeDialog');
  caixa.setAttribute('class', 'alarme');

  // Barra de título
  var titulo = document.createElement('div');
  titulo.setAttribute('class', 'titulo');
  titulo.textContent = 'Lembrete SISREF';
  caixa.appendChild(titulo);

  // Conteúdo principal
  var texto = document.createElement('div');
  texto.setAttribute('class','mensagem');
  texto.textContent = request.greeting;
  caixa.appendChild(texto);

  // Div com display 'table-row' para os botões
  var linha = document.createElement('div');
  linha.setAttribute('class','botoes');

  // Botão para fechar
  var fechar = document.createElement('button');
  fechar.setAttribute('id','fechar');
  fechar.setAttribute('class', 'botao fechar');
  fechar.innerHTML = 'Fechar';

  // Botão para ir para o site do sisref
  var botao = document.createElement('button');
  botao.setAttribute('class','botao botaoLink');
  botao.innerHTML = 'Ir para o SISREF';

  // Elemento <a> com o link para o site do SISREF
  var link = document.createElement('a');
  link.setAttribute('id','linkSisref');
  link.href = "https://sisref.sigepe.gov.br/sisref/entrada.php";
  link.setAttribute('target','_blank');
  // O botão fica dentro do <a>
  link.appendChild(botao);

  // Coloca os dois botões na div
  linha.appendChild(link);
  linha.appendChild(fechar);
  caixa.appendChild(linha);
  document.body.prepend(caixa);

  var fecharButton = document.getElementById('fechar');
  var linkButton = document.getElementById('linkSisref');
  var dialog = document.getElementById('alarmeDialog');
  dialog.returnValue = 'sisref';

  dialogPolyfill.registerDialog(dialog);

  dialog.showModal();
  console.log('Abriu');

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

  console.log('Alarme!');

  function openCheck(dialog) {
    if(dialog.open) {
      console.log('Dialog open');
    } else {
      console.log('Dialog closed');
    }
  }

  // Botão "Fechar" fecha a caixa
  fecharButton.addEventListener('click', function() {
    dialog.close('fechou');
    document.body.removeChild(dialog);
    alarmSound.pause();
    openCheck(dialog);
  });

  // Botão "Link" também fecha a caixa
  linkButton.addEventListener('click', function() {
    dialog.close('fechou');
    document.body.removeChild(dialog);
    alarmSound.pause();
    openCheck(dialog);
  });

  console.log("alertou!");
  return Promise.resolve({response: "Hi from content script"});
});
