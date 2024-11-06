// Funzione per ottenere le email dall'API e mostrarle nella lista
function fetchEmails() {
  fetch("https://flynn.boolean.careers/exercises/api/random/mail")
    .then((response) => response.json())
    .then((data) => data.response)
    .catch((error) => console.error("Errore nell'ottenere le email:", error));
}

// Funzione per aggiungere le email alla lista
function addEmailsToList(emails) {
  const emailList = document.getElementById("emailList");
  emailList.innerHTML = ""; // Svuota la lista esistente

  // Ciclo per aggiungere mail alla ul
  for (let i = 0; i < emails.length; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = emails[i];
    emailList.appendChild(listItem);
  }
}
// Funzione che gestisce il click del bottone per generare nuove email
document.getElementById("generateBtn").addEventListener("click", function () {
  const emails = []; // array vuoto
  const promises = []; // array vuoto

  // Genera 10 email chiamando l'API 10 volte
  for (let i = 0; i < 10; i++) {
    promises.push(
      fetch("https://flynn.boolean.careers/exercises/api/random/mail")
        .then((response) => response.json())
        .then((data) => emails.push(data.response))
        .catch((error) => console.error("Errore nell'ottenere l'email:", error))
    );
  }

  // Una volta che tutte le email sono state ottenute, aggiorno la lista
  Promise.all(promises).then(() => addEmailsToList(emails));
});

// Carica le email iniziali
document.getElementById("generateBtn").click();
