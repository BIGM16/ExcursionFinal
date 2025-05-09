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

// Text en arc
function createArcText(text, radius = 150) {
  const container = document.getElementById("textArc");
  container.innerHTML = ""; // Nettoie l'ancien contenu
  container.style.position = "relative";
  container.style.margin = "0 auto";
  container.style.transform = "rotate(0deg)";

  const angleStep = 150 / text.length; // demi-cercle
  let startAngle = 10 - (angleStep * text.length) / 2;

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.innerText = text[i];
    span.style.position = "absolute";
    span.style.color = "#fff";
    span.style.transformOrigin = `bottom center`;
    span.style.transform = `rotate(${
      startAngle + i * angleStep
    }deg) translateY(-${radius}px)`;
    // span.style.fontSize = "7rem";
    span.style.zIndex = "100";
    container.appendChild(span);
  }
}

// Utilisation :
createArcText("ON ARRIVE !", 200);

// -- Lignes suivante -- //
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
const elements = document.querySelectorAll(".reveal");
elements.forEach((el) => observer.observe(el));







// Ajuster le texte en arc pour les petits écrans
function adjustArcText() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    createArcText("ON ARRIVE !", 50); // Réduire le rayon pour les petits écrans
  } else {
    createArcText("ON ARRIVE !", 200); // Rayon par défaut
  }
}

// Appeler la fonction au chargement et lors du redimensionnement
window.addEventListener("load", adjustArcText);
window.addEventListener("resize", adjustArcText);