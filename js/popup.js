const checkbox = document.getElementById('ativarsom');

checkbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById("som").style.display = "block";
  } else {
    document.getElementById("som").style.display = "none";
  }
});

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
