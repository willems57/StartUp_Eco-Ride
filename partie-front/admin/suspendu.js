import { getToken } from "../js/script.js";

// Récupération des éléments HTML
const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputRole = document.getElementById("RoleInput");
const inputMail = document.getElementById("EmailInput");
const inputUserId = document.getElementById("UserIdInput");
const btnValidation = document.getElementById("btn-validation-modification");
const formInscription = document.getElementById("formulaireInscription");

// Ajout des listeners pour valider le formulaire
inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);

// Valide le formulaire
function validateForm() {
    const nomok = validateRequired(inputNom);
    const prenomok = validateRequired(inputPreNom);
    const mailok = validateMail(inputMail);

    btnValidation.disabled = !(nomok && prenomok && mailok);
}

// Valide un champ requis
function validateRequired(input) {
    if (input.value.trim() !== "") {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Valide un email
function validateMail(input) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const mailUser = input.value.trim();

    if (emailRegex.test(mailUser)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Événement sur le bouton "Modifier"
btnValidation.addEventListener("click", suspendreUtilisateur);

// Fonction pour suspendre un utilisateur
function suspendreUtilisateur() {
    const userId = inputUserId.value; // ID utilisateur
    const newRole = "ROLE_SUSPENDED"; // Rôle pour suspendre l'utilisateur

    if (!userId) {
        alert("Aucun utilisateur sélectionné.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ roles: [newRole] });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
    };

    fetch(`https://ecoride.alwaysdata.net/admin/users/${userId}/role`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log("Utilisateur suspendu avec succès :", result);
            alert("Utilisateur suspendu avec succès.");
        })
        .catch((error) => console.error("Erreur :", error));
}
