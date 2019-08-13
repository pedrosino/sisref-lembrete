//******************************************//

//Busca texto da entrada
entrada = $("#registros").find(":contains('ENTRADA')").next('p').text();
valorEntrada = tempoParaMinutos(entrada);
console.log("Entrou: " + entrada + " (" + valorEntrada + ")");

// Busca texto do intervalo
intervalo = $("#registros").find(":contains('INTERVALO')").next('p').text().trim();

console.log("Intervalo: " + intervalo);

// Separa primeiro pelo espaço (formato hh:mm:ss às hh:mm:ss)
listaIntervalo = intervalo.split(" ");

// O primeiro valor da lista é a hora de início do intervalo
inicio = listaIntervalo[0];
valorInicio = tempoParaMinutos(inicio);

console.log("Início do Intervalo: " + inicio + " (" + valorInicio + ")");

// O terceiro item da lista é a hora do fim do intervalo
fim = listaIntervalo[2];
valorFim = tempoParaMinutos(fim);

console.log("Fim do intervalo: " + fim + " (" + valorFim + ")");

console.log("saiu");