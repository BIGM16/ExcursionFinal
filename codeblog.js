document.addEventListener("DOMContentLoaded", function () {
  // Quelques messages d'exemple pour commencer
  const sampleMessages = [
    "Quelle journée formidable !",
    "Les mots me manquent pour tout décrire...",
    "Les choses étaient cheres moko... Mais on a bien mangé !",
    "L'eau était froide mais c'était chouette",
    "J'ai adoré voir le coucher de soleil sur la plage",
  ];

  // Ajouter les messages d'exemple
  sampleMessages.forEach((message) => {
    addMessageToBoard(message);
  });

  // Gestionnaire pour le bouton de soumission
  document.getElementById("submitBtn").addEventListener("click", function () {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message) {
      addMessageToBoard(message);
      messageInput.value = "";
    }
  });

  // Permettre l'envoi avec Entrée
  document
    .getElementById("messageInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.getElementById("submitBtn").click();
      }
    });
});

function addMessageToBoard(text) {
  const container = document.getElementById("messagesContainer");

  // Créer un nouvel élément de message
  const messageEl = document.createElement("div");

  // Appliquer des styles aléatoires
  const colorClass = `color-${Math.floor(Math.random() * 9) + 1}`;
  const rotateClass = `rotate-${Math.floor(Math.random() * 5) + 1}`;
  const fontSize = Math.floor(Math.random() * 10) + 16; // Entre 16px et 25px

  // Configurer la classe et le style
  messageEl.className = `message ${colorClass} ${rotateClass} p-4 rounded-lg shadow-md m-2`;
  messageEl.style.fontSize = `${fontSize}px`;
  messageEl.style.maxWidth = "300px";
  messageEl.style.animationDelay = `${Math.random() * 0.5}s`;

  // Ajouter le texte
  messageEl.textContent = text;

  // Ajouter au conteneur
  container.prepend(messageEl);

  // Limiter le nombre de messages affichés (optionnel)
  if (container.children.length > 50) {
    container.removeChild(container.lastChild);
  }
}