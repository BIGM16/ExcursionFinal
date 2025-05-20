const eventDate = new Date("May 30, 2025 00:00:00").getTime();
const startDate = new Date().getTime();
const totalDuration = eventDate - startDate;

const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

const circleText = document.getElementById("circle-days");
const detailedTimer = document.getElementById("detailed-timer");

function setProgress(percent) {
  const offset = circumference - percent * circumference;
  circle.style.strokeDashoffset = offset;
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;
  const elapsed = eventDate - now;
  const remainingRatio = Math.max(0, distance / totalDuration);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  circleText.innerHTML = `${days}j`;
  detailedTimer.innerHTML =
    distance > 0
      ? `${days} jours, ${hours} heures, ${minutes} minutes, ${seconds} secondes`
      : "L'événement a commencé !";

  setProgress(remainingRatio);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Modal
const draggable = document.getElementById("circle-timer");
draggable.addEventListener("click", () => {
  document.getElementById("modal").style.display = "flex";
});

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// Rendre le cercle déplaçable

let isDragging = false;
let offsetX, offsetY;

// Souris
draggable.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - draggable.offsetLeft;
  offsetY = e.clientY - draggable.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    draggable.style.left = `${e.clientX - offsetX}px`;
    draggable.style.top = `${e.clientY - offsetY}px`;
    draggable.style.bottom = "auto"; // pour annuler bottom si défini
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Mobile (touch)
draggable.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - draggable.offsetLeft;
  offsetY = touch.clientY - draggable.offsetTop;
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (isDragging) {
      e.preventDefault(); // Empêche le défilement de la page
      const touch = e.touches[0];
      draggable.style.left = `${touch.clientX - offsetX}px`;
      draggable.style.top = `${touch.clientY - offsetY}px`;
      draggable.style.bottom = "auto";
    }
  },
  { passive: false }
);

document.addEventListener("touchend", () => {
  isDragging = false;
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
