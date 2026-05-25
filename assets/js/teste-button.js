const button = document.getElementsByClassName('botao-status');
const navPokemon = document.getElementsByClassName('menu-escondido');

$(document).ready(function(){
    $(button).click(function(){
      $(navPokemon).toggle();
    });
  });