function onError(error) {
  console.log(`Error: ${error}`);
}

function tempoParaMinutos(entrada) {
  // Separa o texto da hora de entrada (formato hh:mm:ss)
  lista = entrada.split(":");

  // Transforma texto em valor para calcular o tempo em minutos
  // Os segundos não serão considerados
  horas = parseInt(lista[0]);
  minutos = parseInt(lista[1]);
  valor = horas*60 + minutos;
  return valor;
}