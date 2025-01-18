import { getToken} from "../js/script.js";

const btntrajetfini = document.getElementById("btntrajetfini");



// fonction pour ajouter des credits au compt admin
btntrajetfini.addEventListener("click", ajtcredit);

function ajtcredit() {
    // Récupérer la valeur actuelle des crédits
    const creditsInput = document.getElementById("creditsInput");
    const currentCredits = parseInt(creditsInput.value) || 0; // Récupérer les crédits et s'assurer que c'est un entier

    // Ajouter 2 crédits
    const newCredits = currentCredits + 2;

    // Préparer les données pour la requête
    const raw = JSON.stringify({
        "credits": newCredits
    });

    // Définir les en-têtes
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());  // Assurez-vous que getToken() fonctionne correctement
    myHeaders.append("Content-Type", "application/json");

    // Définir les options de la requête
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // Effectuer la requête PUT
    fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
        .then((response) => response.json())  // Supposer que la réponse est au format JSON
        .then((result) => console.log(result))
        .catch((error) => console.error("Erreur lors de la mise à jour des crédits", error));
}



alert(<div class="text-center">
    <button type="button" class="btn btn-danger" id="btncomptsupp">Supprimer</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
</div>);



getInfoscredits();

  // Fonction pour récupérer les informations de crédits depuis l'API
function getInfoscredits() {
    let myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Impossible de récupérer les informations.");
                return null;
            }
        })
        .then(result => {
            if (result) {
                displayCredits(result); // Affiche les crédits récupérés
            } else {
                displayNoCreditsMessage(); // Affiche un message en cas d'absence de données
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
}

// Fonction pour afficher les crédits
function displayCredits(data) {
    const creditsImages = document.getElementById("formulaireInscription1");
    if (!creditsImages) {
        console.error("L'élément 'formulaireInscription1' est introuvable.");
        return;
    }

    creditsImages.innerHTML = getCreditsHTML({
        creditsInput: data.credits || "Aucun crédit disponible"
    });
}

// Fonction pour afficher un message si aucun crédit n'est disponible
function displayNoCreditsMessage() {
    const creditsImages = document.getElementById("formulaireInscription1");
    if (!creditsImages) {
        console.error("L'élément 'formulaireInscription1' est introuvable.");
        return;
    }

    creditsImages.innerHTML = `
        <div class="mb-3">
            <div class="container p-4 bg-light rounded">
                <h2 class="text-center">Aucun crédit disponible</h2>
            </div>
        </div>
    `;
}

// Fonction pour générer le HTML des crédits
function getCreditsHTML(data) {
    const { creditsInput } = data;

    // Sécuriser les données avec sanitizeHtml
    const sanitizedCredits = sanitizeHtml(creditsInput);

    return `
        <div class="mb-3">
            <div class="container p-4 bg-light rounded">
                <h2 class="text-center">${sanitizedCredits}</h2>
            </div>
        </div>
    `;
}

