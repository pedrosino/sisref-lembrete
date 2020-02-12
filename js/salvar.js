"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    // a propriedade .value do checkbox é sempre "on", sendo necessário usar .checked para verificar o estado
    ativar_som: document.querySelector("#ativarsom").checked,
    //https://stackoverflow.com/questions/14333797/finding-which-option-is-selected-in-select-without-jquery
    som: document.querySelector("#som option:checked").value,
    inicio_intervalo: document.querySelector("#inicio").value,
    fim_intervalo: document.querySelector("#fim").value,
    saida: document.querySelector("#saida").value,
  });

  console.log("Salvo!");

  let backgroundPage = browser.extension.getBackgroundPage();
  backgroundPage.buscarAlarmes();

  /* teste do title/tooltip */
  var agora = new Date();
  var texto = "Salvo em " + formataNumero(agora.getHours()) + ":" + formataNumero(agora.getMinutes());
  browser.browserAction.setTitle({title: texto});

  window.close();
}

document.querySelector("form").addEventListener("submit", saveOptions);
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', function() {
  console.log('cancelou');
  window.close();
});
