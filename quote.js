const phrases = [
  { text: "Je suis venu te dire que je m'en vais.", artist: "Serge Gainsbourg" },
  { text: "J'ai la mémoire qui flanche, je ne me souviens plus très bien.", artist: "Jeanne Moreau" },
  { text: "Please allow me to introduce myself, I'm a man of wealth and taste.", artist: "The Rolling Stones" },
  { text: "Love is just a kiss away.", artist: "The Rolling Stones" },
  { text: "All you need is love.", artist: "The Beatles" },
  { text: "I want to know what love is.", artist: "Foreigner" },
  { text: "Every breath you take, every move you make, I'll be watching you.", artist: "The Police" },
  { text: "I can't help falling in love with you.", artist: "Elvis Presley" },
  { text: "La nuit je mens, je prends des trains à travers la plaine.", artist: "Alain Bashung" },
  { text: "J'ai fait la saison dans cette boîte crânienne.", artist: "Alain Bashung" },
  { text: "I never wanted anything so much than to drown in your love and not feel your rain.", artist: "Jeff Buckley" },
  { text: "There's a crack in everything, that's how the light gets in.", artist: "Leonard Cohen" },
  { text: "Is this the real life? Is this just fantasy?", artist: "Queen" },
  { text: "We all live in a yellow submarine.", artist: "The Beatles" },
  { text: "I see a red door and I want it painted black.", artist: "The Rolling Stones" },
  { text: "Nos ombres se tiennent par la main quand nos coeurs n'y arrivent plus.", artist: "inspiré par Jeff Buckley" },
  { text: "Si le temps s'effondre, je veux tomber dans tes bras en premier.", artist: "inspiré par Bashung" },
  { text: "Je t'aime comme on aime un pigeon qui comprendrait enfin le sens de la vie.", artist: "inspiré par Gainsbourg" },
  { text: "Ton regard est aussi inutile et magnifique qu'un cactus dans une discothèque.", artist: "inspiré par Gainsbourg" },
  { text: "Nos baisers sentent l'essence et les cerisiers en fleurs.", artist: "inspiré par Bashung" },
  { text: "Ton absence est une chanson que la radio passe en boucle dans ma tête.", artist: "inspiré par Jeff Buckley" },
  { text: "Mon coeur est un hoodie noir trempé par la pluie, mais il bat encore pour toi.", artist: "inspiré par The Cure" },
  { text: "Tu es le néon rose dans ma nuit blanche.", artist: "inspiré par Depeche Mode" },
  { text: "Je crie ton nom dans le vent, mais il ne me répond que des échos fragiles.", artist: "inspiré par Jeff Buckley" },
  { text: "J'ai besoin d'aimer trop fort, même si demain tout s'écroule.", artist: "inspiré par Noir Désir" },
  { text: "Ton silence griffe mes nuits plus fort que n'importe quel orage.", artist: "inspiré par Bashung" },
  { text: "J'avance dans tes yeux comme on traverse une ville en ruine : tremblant mais fasciné.", artist: "inspiré par Bashung" },
  { text: "Ton amour brûle comme un riff de guitare qu'on ne veut jamais voir s'éteindre.", artist: "inspiré par Mick Jagger" },
  { text: "Chaque pas vers toi sonne comme une batterie en furie dans mon sang.", artist: "inspiré par Mick Jagger" },
  { text: "Ton nom flotte dans l'air comme une prière noyée sous la pluie.", artist: "inspiré par Jeff Buckley" },
  { text: "Si je me perds encore, que ce soit dans les abysses de ton étreinte.", artist: "inspiré par Jeff Buckley" },
  { text: "Nos âmes s'embrasent comme des cordes de guitare frappées au bord du vertige.", artist: "inspiré par Noir Désir" },
  { text: "Aimer, c'est hurler à la lune et espérer qu'elle nous réponde un jour.", artist: "inspiré par Leonard Cohen" }
];

// Activer le mode JS
document.body.classList.remove("no-js");

var feed = document.getElementById("feed-js");
var used = [];
var allBlocks = [];

function getRandomQuote() {
  if (used.length >= phrases.length) used.length = 0;
  var index;
  do {
    index = Math.floor(Math.random() * phrases.length);
  } while (used.includes(index));
  used.push(index);
  return phrases[index];
}

function createBlock() {
  var quote = getRandomQuote();
  var block = document.createElement("div");
  block.className = "quote-block";

  var textEl = document.createElement("p");
  textEl.className = "quote-text";

  var words = quote.text.split(" ");
  words.forEach(function (word) {
    var span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    textEl.appendChild(span);
  });

  var artistEl = document.createElement("p");
  artistEl.className = "quote-artist";
  artistEl.textContent = "— " + quote.artist;

  block.appendChild(textEl);
  block.appendChild(artistEl);
  feed.appendChild(block);

  allBlocks.push({ el: block, words: textEl.querySelectorAll(".word"), artist: artistEl });
  return block;
}

function updateWords() {
  allBlocks.forEach(function (block) {
    var rect = block.el.getBoundingClientRect();
    var viewH = window.innerHeight;

    // Zone active : quand le block est entre 80% et 20% du viewport
    var start = viewH * 0.85;
    var end = viewH * 0.15;
    var blockCenter = rect.top + rect.height / 2;

    // Progress de 0 (en bas) à 1 (en haut)
    var progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    var totalWords = block.words.length;
    var litCount = Math.floor(progress * totalWords);

    block.words.forEach(function (word, i) {
      if (i < litCount) {
        word.classList.add("lit");
      } else {
        word.classList.remove("lit");
      }
    });

    // Afficher l'artiste quand tous les mots sont allumés
    if (litCount >= totalWords) {
      block.artist.classList.add("visible");
    } else {
      block.artist.classList.remove("visible");
    }
  });
}

function loadBatch(count) {
  for (var i = 0; i < count; i++) {
    createBlock();
  }
}

// Premier chargement
loadBatch(5);

// Scroll : révélation des mots + infinite scroll
window.addEventListener("scroll", function () {
  updateWords();

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    loadBatch(3);
  }
});

// Premier rendu
updateWords();
