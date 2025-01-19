// Import des utilitaires
import { setCookie, setToken, tokenCookieName, RoleCookieName, apiUrl } from "../script.js";

// Récupération des éléments DOM
const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

// Ajout d'un écouteur d'événements sur le bouton de connexion
btnSignin.addEventListener("click", checkCredentials);

// Fonction principale pour gérer la connexion
async function checkCredentials(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs du formulaire
    const email = mailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation des champs
    if (!email || !password) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Réinitialisation des erreurs visuelles
    mailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    // Configuration des en-têtes et du corps de la requête
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email: email, password }); // Correct pour votre contrôleur

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    // Gestion de l'état du bouton pendant le traitement
    btnSignin.disabled = true;
    btnSignin.textContent = "Connexion...";

    try {
        // Envoi de la requête à l'API
        const response = await fetch(`${apiUrl}/api/security/login`, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.error || "Échec de l'authentification : Identifiants invalides");
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
            throw new Error("Échec de l'authentification");
        }

        // Traitement de la réponse
        const result = await response.json();
        setToken(result.apiToken); // Stockage du token
        setCookie(RoleCookieName, result.roles[0], 7); // Stockage du rôle

        // Message de succès
        alert("Connexion réussie !");

        // Redirection basée sur les rôles
        const redirectUrl = result.roles.includes("ROLE_ADMIN") ? "/admin" : "/dashboard";
        window.location.replace(redirectUrl);

    } catch (error) {
        console.error("Erreur :", error);
        alert("Impossible de se connecter. Veuillez réessayer.");
    } finally {
        // Réinitialisation de l'état du bouton
        btnSignin.disabled = false;
        btnSignin.textContent = "Se connecter";
    }
}
