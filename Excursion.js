window.addEventListener("load", function () {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("mainContent");
    preloader.classList.add("fade-out");
    // Attendre la fin de la transition pour masquer définitivement
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.style.display = "block";
    }, 4000); // correspond à la durée de l'effet de transition
  }, 5000); // délai initial avant de commencer le fondu
});

// Animation de la barre de progression
let lastScrollTop = 0;
const header = document.getElementById("monHeader");
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // vers le bas : cacher le header
    header.style.top = "-100px"; // on le fait remonter hors de l'écran
  } else {
    // vers le haut : afficher le header
    header.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

// Animation de la barre de menu
var menuBtn = document.getElementById("menuBtn");
var monMenu = document.getElementById("monMenu");
var menu = document.getElementById("menu");
var closeBtn = document.getElementById("closeBtn");
var overlay = document.getElementById("overlay");
// click pour ouvrir le menu
menuBtn.onclick = function () {
  monMenu.style.right == "-250px";
    monMenu.style.right = "0px";
    // monMenu.style.zIndex="1000"
  closeBtn.style.display = "flex";
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";
};
// click pour fermer le menu
closeBtn.onclick = function () {
  monMenu.style.right == "0px";
  monMenu.style.right = "-250px";
  closeBtn.style.display = "none";
  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";
};
