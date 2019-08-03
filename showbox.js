"use strict";

// Check if using Chrome or not
const isChrome = typeof browser === "undefined";
if (isChrome) { var browser = chrome; }

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);
  //alert(request.greeting);


  var div = document.createElement('dialog');
  div.setAttribute('id', 'favDialog');
  div.setAttribute('class', 'alarme');
  div.textContent = request.greeting;
  var button = document.createElement('button');
  button.setAttribute('id','cancel');
  button.innerHTML = 'Close';
  div.appendChild(button);
  document.body.appendChild(div);

  //var updateButton = document.getElementById('updateDetails');
  var cancelButton = document.getElementById('cancel');
  var dialog = document.getElementById('favDialog');
  dialog.returnValue = 'favAnimal';

  dialogPolyfill.registerDialog(dialog);

  function openCheck(dialog) {
    if(dialog.open) {
      console.log('Dialog open');
    } else {
      console.log('Dialog closed');
    }
  }

  // Update button opens a modal dialog
  //updateButton.addEventListener('click', function() {
    dialog.showModal();
  //  openCheck(dialog);
  //});

  // Form cancel button closes the dialog box
  cancelButton.addEventListener('click', function() {
    dialog.close('animalNotChosen');
    openCheck(dialog);
  });



  console.log("alertou!");
  return Promise.resolve({response: "Hi from content script"});
});
