"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; };
var message = "";

function checkTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  message = hour + ":" + minutes + " -> ";
  // Check if minutes are even or odd
  if (minutes % 2 == 0) {
    message += "even";
  } else {
    message += "odd";
  }

  console.log(message);
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
