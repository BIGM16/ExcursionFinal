// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.style.top = "0";
    mobileMenu.style.opacity = "1";
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden");
    }
  });
}
const closeBtn = document.getElementById("closeBtn");
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.add("hidden");
    mobileMenu.style.top = "-250px";
    mobileMenu.style.opacity = "0";
  });
} else {
  console.error("Close button not found");
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for fixed header
        behavior: "smooth",
      });

      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu");
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.top = "-250px";
        mobileMenu.style.opacity = "0";
      }
    }
  });
});

// Countdown timer
function updateCountdown() {
  const eventDate = new Date("June 30, 2025 07:30:00").getTime();
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  } else {
    document.getElementById("days").innerText = "TH";
    document.getElementById("hours").innerText = "AN";
    document.getElementById("minutes").innerText = "K Y";
    document.getElementById("seconds").innerText = "OU";
  }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".faq-icon");

    // Toggle answer visibility
    answer.classList.toggle("hidden");

    // Rotate icon
    if (answer.classList.contains("hidden")) {
      icon.classList.remove("rotate-180");
    } else {
      icon.classList.add("rotate-180");
    }
  });
});
const form = document.getElementById("inscription-form");
const confirmation = document.getElementById("confirmation-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value.trim();
  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const tel = document.getElementById("telephone").value.trim();
  const besoin = document.getElementById("besoins").value.trim();

  const message = `Nouvelle inscription à l'excursion Picasso :
Prénom: ${prenom}
Nom: ${nom}
Email: ${email}
Téléphone: ${tel}
Besoin particulier: ${besoin || "Aucune indication"}
Merci bien`;

  const numeroWhatsApp = "243898955349"; // Remplace par ton numéro
  const lien = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    message
  )}`;

  window.open(lien, "_blank"); // Ouvre WhatsApp

  confirmation.style.display = "block"; // Affiche le message
  form.reset(); // Réinitialise le formulaire
});

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("contact-nom").value.trim();
  const sujet = document.getElementById("contact-sujet").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  const contactMessage = `Bonjour, je me présente, je suis ${nom}.
Voici mon message de contact qui est au sujet de "${sujet || "Aucun sujet"}".
Je vous écris à l'adresse email suivante : ${email}.
Mon message est le suivant : ${message}`;

  const numeroWhatsApp = "243996964747"; // Remplace par ton numéro
  const lien = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    contactMessage
  )}`;

  window.open(lien, "_blank"); // Ouvre WhatsApp

  confirmation.style.display = "block"; // Affiche le message
  form.reset(); // Réinitialise le formulaire
});

const newsletterForm = document.getElementById("newsletter-form");
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const Email = document.getElementById("newsletter-email").value.trim();
  const newsletterMessage = `Je souhaite m'inscrire à la newsletter avec 
  l'adresse email suivante : ${Email}`;

  const numeroWhatsApp = "243996964747"; // Remplace par ton numéro
  const lien = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    newsletterMessage
  )}`;

  window.open(lien, "_blank"); // Ouvre WhatsApp

  confirmation.style.display = "block"; // Affiche le message
  form.reset(); // Réinitialise le formulaire
});
