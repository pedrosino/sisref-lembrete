function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  var color = "#acf";
  if (item.color) {
    color = item.color;
  }
  //document.body.style.border = "10px solid " + color;
  document.body.style.background = color;//"#acc";
  console.log("Cor foi pra " + color);
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);

//******************************************//

function mostrar(item) {
  var horario = "12:00";
  if (item.inicio_intervalo) {
    horario = item.inicio_intervalo;
  }

  console.log("Alarme do intervalo: " + horario);
}

var inicio_intervalo = browser.storage.local.get("inicio_intervalo");
inicio_intervalo.then(mostrar, onError);

//******************************************//

//Busca texto da entrada
entrada = $("#registros").find(":contains('ENTRADA')").next('p').text();

// Separa o texto da hora de entrada (formato hh:mm:ss)
lista = entrada.split(":");

// Transforma texto em valor para calcular o tempo em minutos
// Os segundos não serão considerados
horaEntrada = parseInt(lista[0]);
minutosEntrada = parseInt(lista[1]);
valorEntrada = horaEntrada*60 + minutosEntrada;

console.log("Entrou: " + entrada + " (" + valorEntrada + ")");

// Busca texto do intervalo
intervalo = $("#registros").find(":contains('INTERVALO')").next('p').text().trim();

console.log("Intervalo: " + intervalo);

// Separa primeiro pelo espaço (formato hh:mm:ss às hh:mm:ss)
listaIntervalo = intervalo.split(" ");

// O primeiro valor da lista é a hora de início do intervalo
inicio = listaIntervalo[0];
lista = inicio.split(":");

// Transforma texto em valores
horaInicio = parseInt(lista[0]);
minutosInicio = parseInt(lista[1]);
valorInicio = horaInicio*60 + minutosInicio;

console.log("Início do Intervalo: " + inicio + " (" + valorInicio + ")");

// O terceiro item da lista é a hora do fim do intervalo
fim = listaIntervalo[2];
lista = fim.split(":");

horaFim = parseInt(lista[0]);
minutosFim = parseInt(lista[1]);
valorFim = horaFim*60 + minutosFim;

console.log("Fim do intervalo: " + fim + " (" + valorFim + ")");

console.log("saiu");