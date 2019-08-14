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

function formataNumero(entrada) {
  // Se as horas ou minutos forem menores que 10, o comportamento padrão é mostrar só um dígito
  // Por exemplo 16:9 ou 7:20
  // Esta função adiciona um 0 à esquerda quando necessário
  var saida = String(entrada);
  if (saida.length < 2) {
    saida = "0" + saida;
  }
  return saida;
}