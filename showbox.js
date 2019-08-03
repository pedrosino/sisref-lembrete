"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);
  alert(request.greeting);
  console.log("alertou!");
  return Promise.resolve({response: "Hi from content script"});
});
