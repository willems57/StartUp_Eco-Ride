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


const departInput = document.getElementById("departInput");
const arriveInput = document.getElementById("arriveInput");
const datedInput = document.getElementById("datedInput");
const dureeInput = document.getElementById("dureeInput");
const placesInput = document.getElementById("placesInput");
const prixInput = document.getElementById("prixInput");

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const voitureInput = document.getElementById("voitureInput");
const fumeurInput = document.getElementById("fumeurInput");
const annimauxInput = document.getElementById("annimauxInput");
const marqueInput = document.getElementById("marqueInput");
const modeleInput = document.getElementById("modeleInput");
const couleurvInput = document.getElementById("couleurvInput");
const imagevInput = document.getElementById("imagevInput");
const passagersInput = document.getElementById("passagersInput");
const avisInput = document.getElementById("avisInput");
const btndetails = document.getElementById("details-btn");
const Recherchertrajet = document.getElementById("Recherchertrajet");
const trajetsImages = document.getElementById("alltrajetImages");



Recherchertrajet.addEventListener("click", fetchTrajets);

function fetchTrajets() {
    const departInput = document.getElementById("departInput").value.trim();
    const arriveInput = document.getElementById("arriveInput").value.trim();
    const datedInput = document.getElementById("datedInput").value;

    if (!departInput || !arriveInput || !datedInput) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const apiUrl = `https://ecoride.alwaysdata.net/api/api/Trajets?depart=${encodeURIComponent(departInput)}&arrive=${encodeURIComponent(arriveInput)}&datetime=${encodeURIComponent(datedInput)}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Impossible de récupérer les informations");
            }
            return response.json();
        })
        .then(trajets => {
            displayTrajets(trajets);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
}

function displayTrajets(trajets) {
    trajetsImages.innerHTML = trajets.map(trajet => {
        const sanitizedDepart = sanitizeHtml(trajet.depart);
        const sanitizedArrive = sanitizeHtml(trajet.arrive);
        const sanitizedDate = sanitizeHtml(trajet.datetime);
        const sanitizedPrix = sanitizeHtml(trajet.prix);
        const sanitizedPlaces = sanitizeHtml(trajet.places);

        return `
            <div class="mb-3">
                <div class="container p-4 bg-light rounded">
                    <h1 class="text-center">${sanitizedDate}</h1>
                    <h2 class="text-center">${sanitizedDepart} → ${sanitizedArrive}</h2>
                    <h3 class="text-center">${sanitizedPrix}C</h3>
                    <h4 class="text-center">${sanitizedPlaces} places disponibles</h4>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary id="details-btn">Détails</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // Add event listeners for dynamically created buttons
    document.querySelectorAll("details-btn").forEach(button => {
        button.addEventListener("click", () => {
            alert("Afficher les détails du trajet ici !");
        });
    });
}






btndetails.addEventListener("click", checkCredentials2);

    function checkCredentials2(){
        getInfosservice();
        
          function getInfosservice(){
            let myHeaders = new Headers();

            myHeaders.append("X-Auth-TOKEN", getToken());
                myHeaders.append("Content-Type", "application/json");
                
        
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
        
            fetch("https://ecoride.alwaysdata.net/api/trajets", requestOptions)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }
                else{
                    console.log("Impossible de récupérer les informations ");
                }
            })
            .then(result => {
                return result;
            })
            .catch(error =>{
                console.error("erreur lors de la récupération des données", error);
            });
        }
        
        
        const trajetsImages = document.getElementById("alltrajetImages");
        
        const monImage = gettrajetImage({
            inputNom: inputNom.value,
          inputPreNom: inputPreNom.value,
            departInput: departInput.value,
            arriveInput: arriveInput.value,
            datedInput: datedInput.value,
            dureeInput: dureeInput.value,
            voitureInput: voitureInput.value,
            marqueInput: marqueInput.value,
            fumeurInput: fumeurInput.value,
            annimauxInput: annimauxInput.value,
            modeleInput: modeleInput.value,
            couleurvInput: couleurvInput.value,
            placesInput: placesInput.value,
            prixInput: prixInput.value,
            passagers1Input: passagersInput.value,
            imagevInput: imagevInput.value,
            avisInput: avisInput.value, 
        });
        
        trajetsImages.innerHTML = monImage;
        
        function gettrajetImage(data){
            const { avisInput, inputNom, inputPreNom, passagersInput, departInput, fumeurInput, annimauxInput, arriveInput, datedInput, dureeInput, imagevInput, prixInput, placesInput, couleurvInput, modeleInput, marqueInput, voitureInput } = data;
            const sanitizedNom = sanitizeHtml(inputNom);
            const sanitizedPrenom = sanitizeHtml(inputPreNom);
            const sanitizedImage = sanitizeHtml(imagevInput);
            const sanitizedvoiture = sanitizeHtml(voitureInput);
            const sanitizedfumeur = sanitizeHtml(fumeurInput);
            const sanitizedannimaux = sanitizeHtml(annimauxInput);
            const sanitizedmarque = sanitizeHtml(marqueInput);
            const sanitizedmodele = sanitizeHtml(modeleInput);
            const sanitizedcouleurv = sanitizeHtml(couleurvInput);
            const sanitizedplaces = sanitizeHtml(placesInput);
            const sanitizedprix = sanitizeHtml(prixInput);
            const sanitizedpassagers = sanitizeHtml(passagersInput);
            const sanitizedduree = sanitizeHtml(dureeInput);
            const sanitizeddated = sanitizeHtml(datedInput);
            const sanitizedarrive = sanitizeHtml(arriveInput);
            const sanitizeddepart = sanitizeHtml(departInput);
            const sanitizedavis = sanitizeHtml(avisInput);
            return `
            <div class="mb-3">
                 <div class="container p-4">
                            <h1 class="text-center text-whitw">${sanitizeddated}</h1>
                            <h6 class="text-center text-whitw">${sanitizedNom} ${sanitizedPrenom}</h6>
                            <h2 class="text-center text-white">${sanitizeddepart}->${sanitizedarrive}</h2>
                            <h3 class="text-center text-whitw">${sanitizedduree}</h3>
                            <h4 class="text-center text-whitw">${sanitizedprix}</h4>
                            <h5 class="text-center text-whitw">${sanitizedplaces}</h5>
                            <p class="text-center text-whitw">${sanitizedpassagers}</p>
                            <div class="mb-3">
                            <div class="row row-cols-2 align-items-center">
                            <p>${sanitizedvoiture}</p>
                            <p>${sanitizedfumeur}</p>
                            <p>${sanitizedannimaux}</p>
                                <div class="col">
                                    <img class="w-100 rounded" src="${sanitizedImage}"/>
                                </div>
                                <p>${sanitizedmarque}</p>
                            <p>${sanitizedmodele}</p>
                            <p>${sanitizedcouleurv}</p>
                            <div>
                            <p>${sanitizedavis}</p>
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        `;
        }
        
    }