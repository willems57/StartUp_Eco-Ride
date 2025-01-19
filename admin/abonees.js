// Fonction getToken universelle
function getToken() {
  // Vérifie d'abord si le token est dans les cookies
  const cookieToken = getCookie("X-Auth-TOKEN");
  if (cookieToken) {
      return cookieToken;
  }

  // Vérifie si le token est dans le localStorage
  const localStorageToken = localStorage.getItem("X-Auth-TOKEN");
  if (localStorageToken) {
      return localStorageToken;
  }

  // Si aucun token n'est trouvé, affiche une erreur dans la console
  console.error("Aucun token d'authentification trouvé.");
  return null;
}

// Fonction pour récupérer un cookie spécifique
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

// Exemple d'utilisation
// const token = getToken();
// if (token) {
//     console.log("Token récupéré:", token);
// } else {
//     console.log("Impossible de récupérer le token.");
// }
function sanitizeHtml(text) {
  const tempHtml = document.createElement('div');
  tempHtml.textContent = text;
  return tempHtml.innerHTML;
}




// Références des éléments HTML
const form = document.getElementById("searchForm");
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputRole = document.getElementById("RoleInput");
const btnSigninA = document.getElementById("btnSigninA");
const resultContainer = document.getElementById("resultContainer");

// Écouteur d'événement pour le bouton
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

    // Requête API
    fetchUsers(data);
}

function fetchUsers(data) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Content-Type", "application/json");

    // Options de requête
    const requestOptions = {
        method: "POST", // Si votre API permet une recherche avancée via POST
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
    };

    // Requête fetch
    fetch("http://127.0.0.1:8000/admin/users/search", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log("Résultats de la recherche :", result);
            afficherResultats(result);
        })
        .catch((error) => console.error("Erreur :", error));
}

function afficherResultats(users) {
    if (!users.length) {
        resultContainer.innerHTML = `<p class="text-white">Aucun utilisateur trouvé.</p>`;
        return;
    }

    resultContainer.innerHTML = users
        .map((user) => getUserCard(user))
        .join("");
}

// Ajout du bouton "Modifier les rôles" dans les cartes utilisateur
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

// Mise à jour des rôles via API
function updateUserRoles(userId, roles) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getToken()}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ roles }),
    redirect: "follow",
  };

  fetch(`http://127.0.0.1:8000/admin/users/${userId}/role`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log("Rôles mis à jour avec succès :", result);
      alert("Rôles mis à jour avec succès !");
      fetchUsers(); // Recharge la liste des utilisateurs après modification
    })
    .catch(error => console.error("Erreur :", error));
}

