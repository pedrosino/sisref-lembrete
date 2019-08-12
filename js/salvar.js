"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    inicio_intervalo: document.querySelector("#inicio").value
  });

  console.log("salvou 1");

  browser.storage.local.set({
    fim_intervalo: document.querySelector("#fim").value
  });

  console.log("salvou 2");

  browser.storage.local.set({
    saida: document.querySelector("#saida").value
  });

  console.log("salvou 3");

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