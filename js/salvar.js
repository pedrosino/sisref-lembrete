"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    inicio_intervalo: document.querySelector("#inicio").value,
    fim_intervalo: document.querySelector("#fim").value,
    saida: document.querySelector("#saida").value,
    ativar_som: document.querySelector("#ativarsom").value,
    som: document.querySelector("#som").value,
  });

  console.log(document.querySelector("#ativarsom").value);
  console.log(document.querySelector("#som").value);
  console.log("Salvo!");

  let backgroundPage = browser.extension.getBackgroundPage();
  backgroundPage.buscarAlarmes();

  /* teste do title/tooltip */
  var agora = new Date();
  var texto = "Salvo em " + formataNumero(agora.getHours()) + ":" + formataNumero(agora.getMinutes());
  browser.browserAction.setTitle({title: texto});

  window.close();
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#inicio").value = result.inicio_intervalo || "12:00";
    document.querySelector("#fim").value = result.fim_intervalo || "13:00";
    document.querySelector("#saida").value = result.saida || "17:00";
    //document.querySelector("#ativarsom").value = result.ativar_som || "checked";
    //document.querySelector("#som").value = result.som || "galo";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  if (isChrome) {
    browser.storage.local.get(null, setCurrentChoice);
  } else {
    browser.storage.local.get().then(setCurrentChoice, onError);
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', function() {
  console.log('cancelou');
  window.open(chrome.runtime.getURL('options.html'));
  window.close();
})