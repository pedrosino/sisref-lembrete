document.body.style.background = "#aabbcc";
console.log("Cor foi pra #abc");

entrada = $("#registros").find(":contains('ENTRADA')").next('p').text();

console.log(entrada);

intervalo = $("#registros").find(":contains('INTERVALO')").next('p').text().trim();

console.log(intervalo);

console.log("saiu");