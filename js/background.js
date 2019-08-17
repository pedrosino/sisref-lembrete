"use strict";

function buscarAlarmes() {
  if (!isChrome) {
    browser.storage.local.get().then(function(item) {
      console.log('Buscando...');
      if (item.inicio_intervalo) {
        alarme1 = item.inicio_intervalo;
      } else {
        alarme1 = "12:00";
      }

      if (item.fim_intervalo) {
        alarme2 = item.fim_intervalo;
      } else {
        alarme2 = "13:00";
      }

      if (item.saida) {
        alarme3 = item.saida;
      } else {
        alarme3 = "17:00";
      }
      
      console.log(Math.random() + " Encontrei: " + alarme1 + ", " + alarme2 + ", " + alarme3);
    }, onError);
  } else {
    chrome.storage.local.get(null, function(item) {
      console.log('Buscando Chrome...');
      if (item.inicio_intervalo) {
        alarme1 = item.inicio_intervalo;
      } else {
        alarme1 = "12:00";
      }

      if (item.fim_intervalo) {
        alarme2 = item.fim_intervalo;
      } else {
        alarme2 = "13:00";
      }

      if (item.saida) {
        alarme3 = item.saida;
      } else {
        alarme3 = "17:00";
      }
      
      console.log(Math.random() + " Encontrei: " + alarme1 + ", " + alarme2 + ", " + alarme3);
    })
  }
}

function verificaAlarme() {
  buscarAlarmes();
  console.log("Checando alarmes");
  let date = new Date();
  let hora = date.getHours();
  let minutos = date.getMinutes();
  var agora = hora*60 + minutos;
  console.log(date + ": " + agora);

  var a1 = tempoParaMinutos(alarme1);
  var a2 = tempoParaMinutos(alarme2);
  var a3 = tempoParaMinutos(alarme3);

  var d1 = agora - a1;
  var d2 = agora - a2;
  var d3 = agora - a3;

  console.log("A1: " + a1 + " => diff " + d1);
  console.log("A2: " + a2 + " => diff " + d2);
  console.log("A3: " + a3 + " => diff " + d3);

  if (d1 == 0 || d2 == 0 || d3 == 0) {
    message = "São " + formataNumero(hora) + ":" + formataNumero(minutos) + "! Já registrou sua frequência?";
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      sendMessageToTabs(tabs);
    });
  }
}

function sendMessageToTabs(tabs) {
   if (isChrome) {
     browser.tabs.sendMessage(tabs[0].id, {greeting: message}, function(response) {
      console.log("Mensagem do Chrome:");
      console.log(response.response);
     }); 
   } else { 
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {greeting: message}
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response.response);
      }).catch(onError);
    }
  }
}

//**************************************************************//
// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; };
var message = "";
var alarme1 = "", alarme2 = "", alarme3 = "";

// No início, busca os valores dos alarmes
console.log('começou');

buscarAlarmes();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(verificaAlarme);
browser.alarms.create('checkTime', {periodInMinutes: 1});
