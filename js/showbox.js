"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);

  // Caixa de diálogo para exibir a mensagem
  var div = document.createElement('dialog');
  div.setAttribute('id', 'alarmeDialog');
  div.setAttribute('class', 'alarme');
  div.textContent = request.greeting;

  // Botão para fechar
  var fechar = document.createElement('button');
  fechar.setAttribute('id','fechar');
  fechar.setAttribute('class', 'botao fechar');
  fechar.innerHTML = 'Fechar';

  // Botão para ir para o site do sisref
  var link = document.createElement('a');
  link.setAttribute('id','linkSisref');
  link.setAttribute('class','botao botaoLink');
  link.href = "https://sisref.sigepe.gov.br/sisref/entrada.php";
  link.setAttribute('target','_blank');
  link.innerHTML = 'Ir para o SISREF';


  div.appendChild(link);
  div.appendChild(fechar);
  //document.body.appendChild(div);
  document.body.prepend(div);

  var fecharButton = document.getElementById('fechar');
  var linkButton = document.getElementById('linkSisref');
  var dialog = document.getElementById('alarmeDialog');
  dialog.returnValue = 'sisref';

  dialogPolyfill.registerDialog(dialog);

  function openCheck(dialog) {
    if(dialog.open) {
      console.log('Dialog open');
    } else {
      console.log('Dialog closed');
    }
  }

  dialog.showModal();

  // Botão "Fechar" fecha a caixa
  fecharButton.addEventListener('click', function() {
    dialog.close('fechou');
    openCheck(dialog);
  });

  // Botão "Link" também fecha a caixa
  linkButton.addEventListener('click', function() {
    dialog.close('fechou');
    openCheck(dialog);
  });

  console.log("alertou!");
  return Promise.resolve({response: "Hi from content script"});
});
