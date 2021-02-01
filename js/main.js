var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});
$("#botao-trocarfrase").click(trocaFrase);

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function load(){
    musica = new Audio('musica.mp3');
  }
  load();

  $("#botao-som i").on("click", function(){
    musica.play();
    botao = $(this).text();
    if(botao == "volume_off"){
        musica.play();
      $(this).text("volume_up");
    } else{
        musica.pause();
      $(this).text("volume_off");
    }
});

function trocaFrase (){
    var frases = [
        "Eu amo o professor Kennedy",
        "Nós amamos Engenharia de Software",
        "A matéria do professor Kennedy é a melhor",
        "Nenhuma matéria se compara a Tópicos Especiais",
        "Estou com saudades do professor Kennedy",
        "Saudades das musicas que tocavam durante as aulas de Engenharia de Software"
    ];
    var item = frases[Math.floor(Math.random() * frases.length)];
    console.log(item);
    $(".frase").text(item);
    inicializaMarcadores();

}
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
    	var cronometroID = setInterval(function() {
    		tempoRestante--;
    		$("#tempo-digitacao").text(tempoRestante);
    		if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
    		}
    	}, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}