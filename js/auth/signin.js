import { setCookie, setToken, tokenCookieName, RoleCookieName, apiUrl } from "../script.js";
const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

    btnSignin.addEventListener("click", checkCredentials);



    async function checkCredentials(event) {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
    
        // Récupération des valeurs du formulaire
        const email = mailInput.value;
        const password = passwordInput.value;
    
        // Création des entêtes et du body de la requête
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "username": email, // Correspond au champ username attendu par l'API
            "password": password
        });
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        try {
            // Requête HTTP vers l'API
            const response = await fetch("http://127.0.0.1:8000/api/security/login", requestOptions);
    
            if (!response.ok) {
                // Gestion des erreurs d'authentification
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
                throw new Error("Échec de l'authentification : Identifiants invalides");
            }
    
            // Traitement de la réponse
            const result = await response.json();
            const token = result.apiToken;
    
            // Stockage du token et des rôles
            setToken(token);
            setCookie(RoleCookieName, result.roles[0], 7); // Stockage du rôle pendant 7 jours
    
            // Redirection après connexion réussie
            window.location.replace("/");
        } catch (error) {
            console.error("Erreur :", error);
            alert("Impossible de se connecter. Veuillez vérifier vos informations.");
        }
    }
