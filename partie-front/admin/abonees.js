// Fonction getToken universelle
function getToken() {
  const cookieToken = getCookie("X-Auth-TOKEN");
  const localStorageToken = localStorage.getItem("X-Auth-TOKEN");

  if (cookieToken) {
      console.log("Token récupéré depuis les cookies:", cookieToken);
      return cookieToken;
  }
  if (localStorageToken) {
      console.log("Token récupéré depuis le localStorage:", localStorageToken);
      return localStorageToken;
  }

  console.error("Aucun token d'authentification trouvé.");
  alert("Veuillez vous connecter pour continuer.");
  window.location.href = "/signin"; // Redirection
  return null;
}

// Fonction pour obtenir un cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
  }
  return null;
}

// Fonction pour sécuriser le HTML
function sanitizeHtml(text) {
  const tempHtml = document.createElement('div');
  tempHtml.textContent = text;
  return tempHtml.innerHTML;
}

// Références des éléments HTML
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputRole = document.getElementById("RoleInput");
const btnSigninA = document.getElementById("btnSigninA");
const resultContainer = document.getElementById("resultContainer");

// Écouteur d'événement pour le bouton de recherche
btnSigninA.addEventListener("click", handleSearch);

function handleSearch() {
  const data = {
      firstName: inputNom.value.trim(),
      lastName: inputPrenom.value.trim(),
      email: inputMail.value.trim(),
      roles: [inputRole.value.trim()],
  };

  // Validation des champs (facultative)
  if (!data.firstName && !data.lastName && !data.email && (!data.roles || !data.roles[0])) {
      alert("Veuillez remplir au moins un champ pour effectuer une recherche.");
      return;
  }

  // Requête API pour rechercher les utilisateurs
  fetchUsers(data);
}

// Fonction pour rechercher des utilisateurs
function fetchUsers(data) {
  const token = getToken();
  if (!token) return;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  fetch("https://ecoride.alwaysdata.net/admin/users/search", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
  })
  .then((response) => {
      if (!response.ok) {
          if (response.status === 401) {
              alert("Vous n'êtes pas autorisé à accéder à cette ressource.");
          }
          throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
  })
  .then((result) => afficherResultats(result))
  .catch((error) => console.error("Erreur :", error));
}

// Fonction pour afficher les résultats
function afficherResultats(users) {
  if (!users.length) {
      resultContainer.innerHTML = `<p class="text-white">Aucun utilisateur trouvé.</p>`;
      return;
  }
  resultContainer.innerHTML = users.map((user) => getUserCard(user)).join("");
}

// Fonction pour générer une carte utilisateur
function getUserCard(user) {
  const sanitizedNom = sanitizeHtml(user.firstName || "Inconnu");
  const sanitizedPrenom = sanitizeHtml(user.lastName || "Inconnu");
  const sanitizedMail = sanitizeHtml(user.email || "Inconnu");
  const sanitizedRole = sanitizeHtml(user.roles.join(", ") || "Utilisateur");

  return `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${sanitizedNom} ${sanitizedPrenom}</h5>
        <p class="card-text"><strong>Email :</strong> ${sanitizedMail}</p>
        <p class="card-text"><strong>Rôles :</strong> ${sanitizedRole}</p>
        <button class="btn btn-primary" onclick="openRoleModal('${user.id}', ['${user.roles.join("', '")}'])">Modifier les rôles</button>
      </div>
    </div>
  `;
}

// Références pour la modale
const roleModal = new bootstrap.Modal(document.getElementById('roleModal'));
const roleInputModal = document.getElementById('roleInputModal');
const userIdInput = document.getElementById('userId');
const saveRolesButton = document.getElementById('saveRolesButton');

// Fonction pour ouvrir la modale
function openRoleModal(userId, currentRoles) {
  userIdInput.value = userId;
  roleInputModal.value = currentRoles.join(', ');
  roleModal.show();
}

// Gestion du clic sur "Enregistrer"
saveRolesButton.addEventListener('click', () => {
  const userId = userIdInput.value;
  const newRoles = roleInputModal.value.split(',').map(role => role.trim());

  updateUserRoles(userId, newRoles);
  roleModal.hide();
});

// Fonction pour modifier les rôles d'un utilisateur
function updateUserRoles(userId, roles) {
  const token = getToken();
  if (!token) return;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  fetch(`https://ecoride.alwaysdata.net/admin/users/${userId}/role`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({ roles }),
  })
  .then((response) => {
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      return response.json();
  })
  .then(() => {
      alert("Rôles mis à jour avec succès !");
      handleSearch(); // Recharge la liste des utilisateurs
  })
  .catch((error) => console.error("Erreur :", error));
}




getInfoscredits()
// Fonction pour récupérer les informations de crédits depuis l'API
function getInfoscredits() {
  const myHeaders = new Headers();
  myHeaders.append("X-Auth-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://ecoride.alwaysdata.net/admin/users/", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Impossible de récupérer les informations.");
        throw new Error("Erreur lors de la récupération des informations.");
      }
    })
    .then(result => {
      if (result && result.length > 0) {
        afficher1Resultats(result); // Affiche les crédits récupérés
      } else {
        displayaucunabonneesMessage(); // Affiche un message en cas d'absence de données
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}

function afficher1Resultats(users) {
  if (!users.length) {
    resultContainer.innerHTML = `<p class="text-white">Aucun utilisateur trouvé.</p>`;
    return;
  }

  resultContainer.innerHTML = users.map(user => getAbonneCard(user)).join("");
}

// Fonction pour afficher un message si aucun utilisateur n'est trouvé
function displayaucunabonneesMessage() {
  resultContainer.innerHTML = `
    <div class="mb-3">
      <div class="container p-4 bg-light rounded">
        <h2 class="text-center">Aucun utilisateur trouvé.</h2>
      </div>
    </div>
  `;
}

// Fonction pour générer une carte utilisateur
function getAbonneCard(user) {
  const sanitizedNom = sanitizeHtml(user.firstName || "Inconnu");
  const sanitizedPrenom = sanitizeHtml(user.lastName || "Inconnu");
  const sanitizedMail = sanitizeHtml(user.email || "Inconnu");
  const sanitizedRole = sanitizeHtml(user.roles.join(", ") || "Aucun rôle");

  return `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${sanitizedNom} ${sanitizedPrenom}</h5>
        <p class="card-text"><strong>Email :</strong> ${sanitizedMail}</p>
        <p class="card-text"><strong>Rôles :</strong> ${sanitizedRole}</p>
      </div>
    </div>
  `;
}
