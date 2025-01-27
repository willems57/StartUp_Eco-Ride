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



    //import { sanitizeHtml} from "../../js/script";

    const dateavisInput = document.getElementById("dateavisInput");
    const pseudoInput = document.getElementById("pseudoInput");
    const noteInput = document.getElementById("noteInput");
    const commavisInput = document.getElementById("commantaireavisInput");
    const nomInput = document.getElementById("NomInput");
    const btnvoirelesavis = document.getElementById("btnvoirelesavis");
    const btnmessage = document.getElementById("btnmessage");
    const btnenvoyerInput = document.getElementById("btnmessageajt");
    
    // valider avis
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-valider")) {
            const avisId = event.target.getAttribute("data-id");
            validerAvis(avisId);
        }
    });
    
    function validerAvis(avisId) {
        const raw = JSON.stringify({
            name: pseudoInput.value,
            note: noteInput.value,
            commentaire: commavisInput.value,
            createdAt: dateavisInput.value,
            Conducteur: nomInput.value
        });
    
        const myHeaders = new Headers();
        myHeaders.append("X-Auth-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch(`https://ecoride.alwaysdata.net/api/avis`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    alert("Avis validé avec succès !");
                    getInfosAvis(); // Actualiser les avis
                } else {
                    console.error("Erreur lors de la validation de l'avis.");
                }
            })
            .catch((error) => console.error("Erreur :", error));
    }
    
    
// supprimer un avis
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-supprimer")) {
        const avisId = event.target.getAttribute("data-id");
        supprimerAvis(avisId);
    }
});

function supprimerAvis(avisId) {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`https://ecoride.alwaysdata.net/api/avisvalidation/${avisId}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                alert("Avis supprimé avec succès !");
                getInfosAvis(); // Actualiser les avis
            } else {
                console.error("Erreur lors de la suppression de l'avis.");
            }
        })
        .catch((error) => console.error("Erreur :", error));
}

    
    // voir les avis a valider ou supprimer
    btnvoirelesavis.addEventListener("click", voireavis);
    
    function voireavis(){
    // Appeler la fonction pour charger et afficher les avis au chargement de la page
getInfosAvis();
    
      // Fonction pour récupérer les avis depuis l'API
function getInfosAvis() {
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://ecoride.alwaysdata.net/api/avisvalidation", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Impossible de récupérer les informations.");
                return [];
            }
        })
        .then(avis => {
            if (avis.length > 0) {
                displayAvis(avis); // Appeler la fonction pour afficher les avis
            } else {
                displayNoAvisMessage(); // Afficher un message s'il n'y a pas d'avis
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
}

// Fonction pour afficher les avis
function displayAvis(avisList) {
    const avisImage = document.getElementById("allavisImages");
    if (!avisImage) {
        console.error("L'élément 'allavisImages' est introuvable.");
        return;
    }

    avisImage.innerHTML = avisList.map(avis => {
        return getAvisHTML({
            pseudoInput: avis.pseudo || "Pseudo inconnu",
            commavisInput: avis.commentaire || "Commentaire non fourni",
            dateavisInput: avis.date || "Date non disponible",
            nomInput: avis.nom || "Nom du conducteur inconnu"
        });
    }).join("");
}

// Fonction pour afficher un message si aucun avis n'est disponible
function displayNoAvisMessage() {
    const avisImage = document.getElementById("allavisImages");
    if (!avisImage) {
        console.error("L'élément 'allavisImages' est introuvable.");
        return;
    }
    avisImage.innerHTML = "<p>Aucun avis en attente de validation.</p>";
}

// Fonction pour générer le HTML d'un avis
function getAvisHTML(data) {
    const { pseudoInput, commavisInput, dateavisInput, nomInput } = data;

    // Utiliser sanitizeHtml pour sécuriser les données affichées
    const sanitizedName = sanitizeHtml(pseudoInput);
    const sanitizedCommentaire = sanitizeHtml(commavisInput);
    const sanitizedDate = sanitizeHtml(dateavisInput);
    const sanitizedConducteur = sanitizeHtml(nomInput);

    return `
        <div class="mb-3">
            <div class="container p-4 bg-light rounded">
                <h1 class="text-center">${sanitizedName}</h1>
                <p class="text-muted">${sanitizedDate}</p>
                <h2 class="text-center">${sanitizedConducteur}</h2>
                <div class="mt-3">
                    <p>${sanitizedCommentaire}</p>
                </div>
                <div class="text-center mt-4">
                    <button type="button" class="btn btn-success" id="btn-valider">Valider</button>
                    <button type="button" class="btn btn-danger" id="btn-supprimer">Supprimer</button>
                </div>
            </div>
        </div>
    `;
}
    }

// pour voir les essage
      btnmessage.addEventListener("click", voiremessage);
    
    function voiremessage(){
      
        // Appeler la fonction pour charger et afficher les messages au chargement de la page
getInfosMessages();
// Fonction pour récupérer les messages depuis l'API
function getInfosMessages() {
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://ecoride.alwaysdata.net/api/contacts", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Impossible de récupérer les informations.");
            }
        })
        .then(messages => {
            if (messages) {
                displayMessages(messages); // Appeler la fonction pour afficher les messages
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
}

// Fonction pour afficher les messages
function displayMessages(messages) {
    const avisImage = document.getElementById("allavisImages");
    if (!avisImage) {
        console.error("L'élément 'allavisImages' est introuvable.");
        return;
    }

    if (messages.length === 0) {
        avisImage.innerHTML = "<p>Aucun message disponible.</p>";
        return;
    }

    // Générer le contenu HTML pour chaque message
    avisImage.innerHTML = messages.map(message => {
        return getMessageHTML({
            nomInput: message.nom || "Nom inconnu",
            msgcInput: message.message || "Message non fourni",
            datecInput: message.date || "Date non disponible",
            mailcInput: message.email || "Email non disponible"
        });
    }).join("");
}

// Fonction pour générer le HTML d'un message
function getMessageHTML(data) {
    const { nomInput, msgcInput, datecInput, mailcInput } = data;

    // Utiliser sanitizeHtml pour protéger contre les injections XSS
    const sanitizedName = sanitizeHtml(nomInput);
    const sanitizedMessages = sanitizeHtml(msgcInput);
    const sanitizedDate = sanitizeHtml(datecInput);
    const sanitizedMail = sanitizeHtml(mailcInput);

    return `
        <div class="mb-3">
            <div class="container p-4 bg-light rounded">
                <h1 class="text-center">${sanitizedName}</h1>
                <p class="text-muted">${sanitizedDate}</p>
                <div class="text-center">
                    <h2>${sanitizedMail}</h2>
                </div>
                <div class="mt-3">
                    <p class="text-justify">${sanitizedMessages}</p>
                </div>
                <div class="text-center mt-4">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#messageModal">
                        Répondre
                    </button>
                </div>
            </div>
        </div>
    `;
}
    }


  


    btnenvoyerInput.addEventListener("click", () => {
        const message = document.getElementById("messageInput"); // Message
        const mailInput = document.getElementById("EmailInput"); // E-mail
    
        // Collecte des données
        const destinataires = mailInput.value.trim();
        const content = message.value.trim();
    
        // Validation des données
        if (!destinataires || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destinataires)) {
            console.error("L'adresse e-mail n'est pas valide.");
            return;
        }
    
        if (!content) {
            console.error("Le message est vide.");
            return;
        }
    
        // Fonction pour envoyer les données à l'API
        const sendMessage = async () => {
            const apiUrl = 'https://ecoride.alwaysdata.net/api/send-message';
            const data = {
                content: content,
                email: destinataires
            };
    
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Erreur:', errorData.error);
                    return;
                }
    
                const responseData = await response.json();
                console.log('Succès:', responseData.status);
            } catch (error) {
                console.error('Erreur réseau ou serveur:', error);
            }
        };
    
        // Appeler la fonction pour envoyer un message
        sendMessage();
    });
    