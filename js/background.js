"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; };
var message = "";
var alarme1 = "12:00", alarme2 = "13:00", alarme3 = "17:00";

function mostrar(item) {
  if (item.inicio_intervalo) {
    alarme1 = item.inicio_intervalo;
  }

  if (item.fim_intervalo) {
    alarme2 = item.fim_intervalo;
  }

  if (item.saida) {
    alarme3 = item.saida;
  }
  
  message += "<br/>Alarme1: " + alarme1;
  message += "\nAlarme2: " + alarme2;
  message += "\nAlarme3: " + alarme3;
  console.log("Alarme do intervalo: " + alarme1);
  console.log("Alarme volta: " + alarme2);
  console.log("Alarme saida: " + alarme3);
}

function checkTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  message = "Agora: " + hour + ":" + minutes + " -> ";
  // Check if minutes are even or odd
  if (minutes % 2 == 0) {
    message += "even";
  } else {
    message += "odd";
  }

  var itens = browser.storage.local.get();
  itens.then(mostrar, onError);

  console.log("Enviando: " + message);
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    sendMessageToTabs(tabs);
  });
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 1});


function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
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

/*browser.browserAction.onClicked.addListener(() => {
  message = isChrome ? "This is Chrome" : "Firefox here";
  message += " at " + new Date();
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    sendMessageToTabs(tabs);
  });
});*/
