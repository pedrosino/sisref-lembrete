const checkbox = document.getElementById('ativarsom');

checkbox.addEventListener('change', MostraCheckbox);

function MostraCheckbox(event) {
  if (checkbox.checked) {
    console.log('Ativar sim');
    document.getElementById("som").style.display = "block";
  } else {
    console.log('Ativar nao');
    document.getElementById("som").style.display = "none";
  }
}

function SelecionarSom(event) {
  var endereco = browser.runtime.getURL('sounds/' + event.target.value + '.wav');
  console.log(endereco);

  var alarmSound = new Audio(endereco);
  //a.play();
  var playPromise = alarmSound.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      console.log('Tocando ' + event.target.value);
    })
    .catch(error => {
      // Auto-play was prevented
      console.log(error);
    });
  }

  setTimeout(function() {
    alarmSound.pause();
    console.log('Parou ' + event.target.value);
  }, 3000);
}

const selectSom = document.getElementById('som');

selectSom.addEventListener('change', SelecionarSom);
//document.addEventListener("DOMContentLoaded", MostraCheckbox);

function setCurrentChoice(result) {
  document.querySelector("#inicio").value = result.inicio_intervalo || "12:00";
  document.querySelector("#fim").value = result.fim_intervalo || "13:00";
  document.querySelector("#saida").value = result.saida || "17:00";
  console.log("ativar: " + result.ativar_som);
  document.querySelector("#ativarsom").checked = result.ativar_som;
  MostraCheckbox();
  //https://stackoverflow.com/a/23218508
  document.querySelector("#som > option[value='" + result.som + "']").selected = true;
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function restoreOptions() {
  if (isChrome) {
    browser.storage.local.get(null, setCurrentChoice);
  } else {
    browser.storage.local.get().then(setCurrentChoice, onError);
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
