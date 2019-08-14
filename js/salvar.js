"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    inicio_intervalo: document.querySelector("#inicio").value,
    fim_intervalo: document.querySelector("#fim").value,
    saida: document.querySelector("#saida").value
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

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#inicio").value = result.inicio_intervalo || "12:00";
    document.querySelector("#fim").value = result.fim_intervalo || "13:00";
    document.querySelector("#saida").value = result.saida || "17:00";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
