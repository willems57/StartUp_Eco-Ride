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



  
function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}




const btnrecherche = document.getElementById("Recherchertrajet");
// Fonction principale pour récupérer les trajets
btnrecherche.addEventListener("click", fetchTrajets);
function fetchTrajets() {
    const departInput = document.getElementById("departInput")?.value.trim();
    const arriveInput = document.getElementById("arriveInput")?.value.trim();
    const datedInput = document.getElementById("datedInput")?.value;

    if (!departInput || !arriveInput || !datedInput) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const apiUrl = `https://ecoride.alwaysdata.net/api/trajets?depart=${encodeURIComponent(departInput)}&arrive=${encodeURIComponent(arriveInput)}&datetime=${encodeURIComponent(datedInput)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur serveur : Impossible de récupérer les informations des trajets");
            }
            return response.json();
        })
        .then(trajets => {
            displayTrajets(trajets);
            updateReservationButtons(trajets); // Mettre à jour les boutons après affichage
        })
        .catch(error => {
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
            console.error("Erreur lors de la récupération des trajets :", error);
        });
}

// Fonction pour afficher les trajets
function displayTrajets(trajets) {
    const trajetsImages = document.getElementById("alltrajetImages");
    if (!trajetsImages) {
        console.error("L'élément 'alltrajetImages' est introuvable.");
        return;
    }

    trajetsImages.innerHTML = trajets.map(trajet => {
        const sanitizedDepart = sanitizeHtml(trajet.depart);
        const sanitizedArrive = sanitizeHtml(trajet.arrive);
        const sanitizedDate = sanitizeHtml(trajet.date);
        const sanitizedPrix = sanitizeHtml(trajet.prix);
        const placesRestantes = trajet.voiture.place - trajet.passagers.length;
        const sanitizedPlaces = placesRestantes > 0 ? placesRestantes : 0;
        const sanitizedImage = sanitizeHtml(trajet.voiture.image || "default.jpg");
        const sanitizedMarque = sanitizeHtml(trajet.voiture.marque || "Marque inconnue");
        const sanitizedModele = sanitizeHtml(trajet.voiture.modele || "Modèle inconnu");
        const sanitizedCouleur = sanitizeHtml(trajet.voiture.couleur || "Couleur inconnue");
        const sanitizedFumeur = trajet.voiture.fumeur ? "Fumeur autorisé" : "Non fumeur";
        const sanitizedAnimaux = trajet.voiture.annimaux ? "Animaux autorisés" : "Pas d'animaux";

        // Liste des passagers
        const passagersHtml = trajet.passagers.length
            ? trajet.passagers.map(passager => `<li>${sanitizeHtml(passager.nom)} ${sanitizeHtml(passager.prenom)}</li>`).join("")
            : "<li>Aucun passager pour le moment</li>";

        const isFull = sanitizedPlaces <= 0;
        const buttonClass = isFull ? "btn-secondary" : "btn-primary";
        const buttonText = isFull ? "Complet" : "Réserver";

        return `
            <div class="mb-3">
                <div class="container p-4 bg-light rounded">
                    <h1 class="text-center">${sanitizedDate}</h1>
                    <h2 class="text-center">${sanitizedDepart} → ${sanitizedArrive}</h2>
                    <h3 class="text-center">${sanitizedPrix} €</h3>
                    <h4 class="text-center">${sanitizedPlaces} places disponibles</h4>
                    <div class="text-center">
                        <img class="w-50 rounded" src="${sanitizedImage}" alt="Image du véhicule">
                        <p>Voiture : ${sanitizedMarque} (${sanitizedModele}, ${sanitizedCouleur})</p>
                        <p>${sanitizedFumeur} | ${sanitizedAnimaux}</p>
                    </div>
                    <div class="text-center">
                        <button 
                            type="button" 
                            class="btn ${buttonClass} reserve-btn" 
                            data-id="${trajet.id}" 
                            ${isFull ? "disabled" : ""}>
                            ${buttonText}
                        </button>
                    </div>
                    <div class="mt-3">
                        <h5>Passagers :</h5>
                        <ul>
                            ${passagersHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // Ajouter des événements sur les boutons "Réserver"
    document.querySelectorAll(".reserve-btn").forEach(button => {
        button.addEventListener("click", () => {
            const trajetId = button.dataset.id;
            createReservation(trajetId);
        });
    });
}


// Fonction pour mettre à jour les boutons "Réserver" en fonction des places disponibles
function updateReservationButtons(trajets) {
    trajets.forEach(trajet => {
        const button = document.querySelector(`.reserve-btn[data-id="${trajet.id}"]`);
        if (!button) return;

        const placesRestantes = trajet.voiture.place - trajet.passagers.length;

        if (placesRestantes <= 0) {
            button.disabled = true;
            button.textContent = "Complet";
            button.classList.add("btn-secondary");
            button.classList.remove("btn-primary");
        } else {
            button.disabled = false;
            button.textContent = "Réserver";
            button.classList.add("btn-primary");
            button.classList.remove("btn-secondary");
        }
    });
}

// Fonction pour créer une réservation
function createReservation(trajetId) {
    getUserId().then(userId => {
        if (!userId) {
            alert("Veuillez vous connecter pour effectuer une réservation !");
            return;
        }

        const reservationData = {
            trajets_id: trajetId,
            user_id: userId,
        };

        fetch("https://ecoride.alwaysdata.net/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservationData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la création de la réservation");
                }
                return response.json();
            })
            .then(data => {
                alert("Réservation réussie !");
                console.log("Réservation :", data);
                fetchTrajets(); // Actualiser les trajets après réservation
            })
            .catch(error => {
                console.error("Erreur lors de la réservation :", error);
            });
    });
}

// Fonction pour récupérer l'utilisateur connecté via l'API
function getUserId() {
    const apiToken = localStorage.getItem(getToken()); // Stockez l'apiToken dans le stockage local après connexion

    if (!apiToken) {
        alert("Veuillez vous connecter pour continuer.");
        return null;
    }

    return fetch("https://ecoride.alwaysdata.net/api/security/account/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des informations utilisateur");
            }
            return response.json();
        })
        .then(user => user.id)
        .catch(error => {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            return null;
        });
}
