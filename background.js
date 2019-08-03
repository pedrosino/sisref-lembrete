"use strict";

/*
  function checkTime() {
  let date = new Date();
  let minutes = date.getMinutes();
  // Check if minutes are even or odd
  if (minutes % 2 == 0) {
    var message = "even";
    //console.log("even");
  } else {
    var message = "odd";
    //console.log("odd");
  }

  browser.tabs.sendMessage(tabs[0].id, {replacement: message});
}

// On start up, check the time to see what theme to show.
checkTime();
*/
// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

var message;

// Set up an alarm to check this regularly.
///browser.alarms.onAlarm.addListener(checkTime);
///browser.alarms.create('checkTime', {periodInMinutes: 3});


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

browser.browserAction.onClicked.addListener(() => {
  message = isChrome ? "This is Chrome" : "Firefox here";
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    sendMessageToTabs(tabs);
  });
});
