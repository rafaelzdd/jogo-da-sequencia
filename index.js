//Variáveis
var coresDoBotao = ["vermelho", "azul", "verde", "amarelo"];
var padraoDoJogo = [];
var padraoDoJogador = [];
var comecou = false;
var nivel = 0;

// Execução do programa
$(document).keypress(function () {
  if (!comecou) {
    $("h1").text("Nível " + nivel);
    proximaSequencia();
    comecou = true;
  }
});

$(".btn").click(function () {
  var corClicada = $(this).attr("id");
  padraoDoJogador.push(corClicada);
  tocaSom(corClicada);
  animacaoDoClique(corClicada);
  checaResposta(padraoDoJogador.length - 1);
});


function checaResposta(nivelAtual) {
  if (padraoDoJogador[nivelAtual] === padraoDoJogo[nivelAtual]) {
    if (padraoDoJogador.length === padraoDoJogo.length) {
      setTimeout(function () {
        proximaSequencia();
      }, 1000);
      
    }
  } else {
    tocaSom("errado");
    $("body").addClass("game-over");
    $("h1").text("Errado! Aperte qualquer tecla para recomeçar");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    recomecar();
  }
}

function proximaSequencia() {
  padraoDoJogador = [];
  nivel++;
  $("h1").text("Nível " + nivel);
  var numeroAleatorio = Math.floor(Math.random() * 4);
  corAleatoria = coresDoBotao[numeroAleatorio];
  padraoDoJogo.push(corAleatoria);
  $("#" + corAleatoria).fadeOut(100).fadeIn(100);
  tocaSom(corAleatoria);
}

function tocaSom(parametro) {
  var audio = new Audio("sounds/" + parametro + ".mp3");
  audio.play();
}

function animacaoDoClique(parametro) {
  $("#" + parametro).addClass("pressed");
  setTimeout(function () {
    $("#" + parametro).removeClass("pressed");
  }, 100);
}

function recomecar() {
  padraoDoJogo = [];
  nivel = 0;
  comecou = false;
}