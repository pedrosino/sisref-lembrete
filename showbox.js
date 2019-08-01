"use strict";

// Check if using Chrome or not
if (typeof browser === "undefined") { var browser = chrome; }

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);
  return Promise.resolve({response: "Hi from content script"});
});