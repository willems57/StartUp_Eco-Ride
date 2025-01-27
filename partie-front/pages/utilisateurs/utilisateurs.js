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






const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const departInput = document.getElementById("departInput");
const arriveInput = document.getElementById("arriveInput");
const datedInput = document.getElementById("datedInput");
const dureeInput = document.getElementById("dureeInput");
const voitureInput = document.getElementById("voitureInput");
const fumeurInput = document.getElementById("fumeurInput");
const annimauxInput = document.getElementById("annimauxInput");
const dateiInput = document.getElementById("dateiInput");
const marqueInput = document.getElementById("marqueInput");
const modeleInput = document.getElementById("modeleInput");
const couleurvInput = document.getElementById("couleurvInput");
const imagevInput = document.getElementById("imagevInput");
const placesInput = document.getElementById("placesInput");
const prixInput = document.getElementById("prixInput");
//const inputCredit = document.getElementById("creditInput");
const passagersInput = document.getElementById("passagersInput");
const btntrajetajtInput = document.getElementById("btntrajetajtmodal");
const btnpdemarertrajet = document.getElementById("btnpdemarertrajet");
const btntrajetsuppInput = document.getElementById("btntrajetsupp");
const ajttrajetform = document.getElementById("ajtfromtrajet");
const supptrajetform = document.getElementById("suppfromtrajet");
const btnvehiculeajtInput = document.getElementById("btnvehiculeajtmodal");
const btnvehiculesuppInput = document.getElementById("btnvehiculesupp");
const ajtvehiculeform = document.getElementById("ajtfromvehicule");
const suppvehiculeform = document.getElementById("suppfromvehicule");
const btntrajetfini = document.getElementById("btntrajetfini");
//const btnpayer = document.getElementById("btnpayer");




//fetch de service
btntrajetajtInput.addEventListener("click", ajttrajet);

function ajttrajet(){

    const dataForm = new FormData(ajttrajetform);

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "conducteur": dataForm.get(inputNom.value + inputPreNom.value),
      "depart": dataForm.get(departInput.value),
      "arrive": dataForm.get(arriveInput.value),
      "date": dataForm.get(datedInput.value),
      "duree": dataForm.get(dureeInput.value),
      "voiture": dataForm.get(voitureInput.value),
      "prix": dataForm.get(prixInput.value),
      "passager": dataForm.get(passagersInput.value)
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://ecoride.alwaysdata.net/api/trajets", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}


btntrajetsuppInput.addEventListener("click", supptrajet);

function supptrajet(){

    const dataForm = new FormData(supptrajetform);

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "depart": dataForm.get(departInput),
  "datetime": dataForm.get(datedInput)
});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://ecoride.alwaysdata.net/api/trajets", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}


// pour nettoyer l'espace des trajets depuis le bouton supprimer du trajet
btntrajetsuppInput.addEventListener("click", supptrajetafficher);

function supptrajetafficher(){

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://ecoride.alwaysdata.net/api/trajets", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

// pour nettoyer l'espace des trajets en cours
btnpdemarertrajet.addEventListener("click", supptrajetpourdemarer);

function supptrajetpourdemarer(){

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://ecoride.alwaysdata.net/api/trajetsencours", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}



//fetch de ajt vehicule
btnvehiculeajtInput.addEventListener("click", ajtvehicule);


function ajtvehicule(){

    const dataForm = new FormData(ajtvehiculeform);

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
       "Nom": dataForm.get(inputNom.value),
        "voiture": dataForm.get(voitureInput.value),
        "dateimat": dataForm.get(dateiInput.value),
        "fumeur": dataForm.get(fumeurInput.value),
      "annimaux": dataForm.get(annimauxInput.value),
        "marque": dataForm.get(marqueInput.value),
        "place": dataForm.get(placesInput.value),
      "modele": dataForm.get(modeleInput.value),
      "couleur": dataForm.get(couleurvInput.value),
      "image": dataForm.get(imagevInput.value)
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://ecoride.alwaysdata.net/api/voitures", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}



// suprimer un vehicule
btnvehiculesuppInput.addEventListener("click", suppvehicule);

function suppvehicule(){

    const dataForm = new FormData(suppvehiculeform);

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "voiture": dataForm.get(voitureInput)
});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://ecoride.alwaysdata.net/api/voitures", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}




// listes des trajets


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

    fetch("https://ecoride.alwaysdata.net/api/security/account/me", requestOptions)
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
  conducteurInput: inputNom.value + inputPreNom.value,
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
    passagersInput: passagersInput.value,
    imagevInput: imagevInput.value, 
});

trajetsImages.innerHTML = monImage;

function gettrajetImage(data){
    const { inputNom, inputPreNom, passagersInput, departInput, fumeurInput, annimauxInput, arriveInput, datedInput, dureeInput, imagevInput, prixInput, placesInput, couleurvInput, modeleInput, marqueInput, voitureInput } = data;
   
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
                    </div>
                    <div class="text-center">
                              <button type="button" class="btn btn-primary" id="btnpdemarertrajet">Demarer</button>
                          </div>
                          <div class="text-center">
                          <button type="button" class="btn btn-danger" id="btntrajetsupp">Supprimer</button>
                      </div>
                    </div>
                </div>
                </div>
                `;
}






// liste des vehicules

getInfosvehicule();

  function getInfosvehicule(){
    let myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://ecoride.alwaysdata.net/api/security/account/me", requestOptions)
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




const vehiculeImages = document.getElementById("allvehiculeImages");

const vehiculeImage = getvehiculeImage({
  inputNom: inputNom.value,
    voitureInput: voitureInput.value,
    marqueInput: marqueInput.value,
    modeleInput: modeleInput.value, 
    couleurvInput: couleurvInput.value,
    fumeurInput: fumeurInput.value,
    annimauxInput: annimauxInput.value,
    dateiInput: dateiInput.value,
    imagevInput: imagevInput.value,
    placesInput: placesInput.value

});
vehiculeImages.innerHTML = vehiculeImage;

function getvehiculeImage(data){
    const {inputNom, imagevInput, placesInput, dateiInput, annimauxInput, fumeurInput, couleurvInput, modeleInput, marqueInput, voitureInput } = data;
    const sanitizedNom = sanitizeHtml(inputNom);
    const sanitizedImage = sanitizeHtml(imagevInput);
    const sanitizedannimaux = sanitizeHtml(annimauxInput);
    const sanitizedfumeur = sanitizeHtml(fumeurInput);
    const sanitizeddatei = sanitizeHtml(dateiInput);
    const sanitizedplaces = sanitizeHtml(placesInput);
    const sanitizedvoiture = sanitizeHtml(voitureInput);
    const sanitizedmarque = sanitizeHtml(marqueInput);
    const sanitizedmodele = sanitizeHtml(modeleInput);
    const sanitizedcouleurv = sanitizeHtml(couleurvInput);
    return `
    <div class="mb-3" col-6 col-lg-4>
         <div class="container p-4">
                    <div class="mb-3">
                    <div class="row row-cols-2 align-items-center">
                    <h5>${sanitizedNom}</h5>
                    <h1>${sanitizedvoiture}</h1>
                    <p>${sanitizeddatei}</p>
                    <p>${sanitizedplaces}</p>
                        <div class="col">
                            <img class="w-100 rounded" src="${sanitizedImage}"/>
                        </div>
                        <h2>${sanitizedmarque}</h2>
                    <h3>${sanitizedmodele}</h3>
                    <h4>${sanitizedcouleurv}</h4>
                    <p>${sanitizedannimaux}</p>
                    <p>${sanitizedfumeur}</p>
                    </div>
                    </div>
                </div>
                </div>   
                `;
}


// fetch pour demarer le trajet
btnpdemarertrajet.addEventListener("click", demarer);
    
function demarer(){

    const dataForm = new FormData();

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
       "conducteur": dataForm.get(inputNom.value + inputPreNom.value),
       "depart": dataForm.get(departInput.value),
      "arrive": dataForm.get(arriveInput.value),
      "date": dataForm.get(datedInput.value),
      "duree": dataForm.get(dureeInput.value),
        "voiture": dataForm.get(voitureInput.value),
  "passager": dataForm.get(passagersInput.value)
});

const requestOptions = {
method: "POST",
body: raw,
redirect: "follow"
};

fetch("https://ecoride.alwaysdata.net/api/trajetsencours", requestOptions)
.then((response) => response.text())
.then((result) => console.log(result))
.catch((error) => console.error(error));

}


// fetch pour voir les trajets en cours
gettrajetencoursInfos();

function gettrajetencoursInfos() {
  let myHeaders = new Headers();
  myHeaders.append("X-Auth-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  // Récupérer les données depuis l'API
  fetch("https://ecoride.alwaysdata.net/api/security/account/me", requestOptions)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              console.error("Impossible de récupérer les informations. Statut:", response.status);
              return null;
          }
      })
      .then(data => {
          if (data) {
              afficherTrajetEnCours(data);
          }
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données :", error);
      });
}

// Fonction pour afficher les données récupérées
function afficherTrajetEnCours(data) {
  const monImage = getdemarertrajetImage({
      inputNom: data.nom,
      inputPreNom: data.prenom,
      departInput: data.depart,
      arriveInput: data.arrive,
      datedInput: data.date_depart,
      dureeInput: data.duree,
      voitureInput: data.voiture,
      marqueInput: data.marque,
      fumeurInput: data.fumeur,
      annimauxInput: data.animaux,
      modeleInput: data.modele,
      couleurvInput: data.couleur,
      placesInput: data.places_disponibles,
      prixInput: data.prix,
      passagersInput: data.passagers,
      imagevInput: data.image_voiture,
  });

  // Insérez l'HTML généré dans un conteneur
  const container = document.getElementById("resultContainer"); // Assurez-vous qu'un conteneur existe
  container.innerHTML = monImage;
}

// Fonction pour générer l'HTML
function getdemarertrajetImage(data) {
  const sanitizedData = sanitizeAllFields(data);

  return `
  <div class="mb-3">
      <div class="container p-4">
          <h1 class="text-center text-white">${sanitizedData.datedInput}</h1>
          <h6 class="text-center text-white">${sanitizedData.inputNom} ${sanitizedData.inputPreNom}</h6>
          <h2 class="text-center text-white">${sanitizedData.departInput} -> ${sanitizedData.arriveInput}</h2>
          <h3 class="text-center text-white">${sanitizedData.dureeInput}</h3>
          <h4 class="text-center text-white">${sanitizedData.prixInput}</h4>
          <h5 class="text-center text-white">${sanitizedData.placesInput}</h5>
          <p class="text-center text-white">${sanitizedData.passagersInput}</p>
          <div class="mb-3">
              <div class="row row-cols-2 align-items-center">
                  <p>${sanitizedData.voitureInput}</p>
                  <p>${sanitizedData.fumeurInput}</p>
                  <p>${sanitizedData.annimauxInput}</p>
                  <div class="col">
                      <img class="w-100 rounded" src="${sanitizedData.imagevInput}" alt="Image voiture"/>
                  </div>
                  <p>${sanitizedData.marqueInput}</p>
                  <p>${sanitizedData.modeleInput}</p>
                  <p>${sanitizedData.couleurvInput}</p>
              </div>
              <div class="text-center">
                  <p>Voyage en cours</p>
              </div>
              <div class="text-center">
                  <button type="button" class="btn btn-danger" id="btntrajetfini">Terminer</button>
              </div>
          </div>
      </div>
  </div>`;
}

// Fonction pour assainir les champs
function sanitizeAllFields(data) {
  const sanitizedData = {};
  for (let key in data) {
      sanitizedData[key] = sanitizeHtml(data[key]);
  }
  return sanitizedData;
}




btntrajetfini.addEventListener("click", trajetterminer);

function trajetterminer(){
  const dataForm = new FormData();

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "conducteur": dataForm.get(inputNom.value + inputPreNom.value),
       "depart": dataForm.get(departInput.value),
      "arrive": dataForm.get(arriveInput.value),
      "date": dataForm.get(datedInput.value),
      "duree": dataForm.get(dureeInput.value),
        "voiture": dataForm.get(voitureInput.value),
  "passager": dataForm.get(passagersInput.value)
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://ecoride.alwaysdata.net/api/trajetsfini", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}


// fetch pour voir les trajets fini
gettrajetfiniInfos()
function gettrajetfiniInfos() {
  let myHeaders = new Headers();
  myHeaders.append("X-Auth-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  // Fetch les données
  fetch("https://ecoride.alwaysdata.net/api/security/account/me", requestOptions)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              console.error("Impossible de récupérer les informations. Statut:", response.status);
              return null;
          }
      })
      .then(data => {
          if (data) {
              afficherTrajetFini(data);
          }
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données:", error);
      });
}

// Fonction pour afficher les données
function afficherTrajetFini(data) {
  const monImage = getfinitrajetImage({
      inputNom: data.nom,
      inputPreNom: data.prenom,
      departInput: data.depart,
      arriveInput: data.arrive,
      datedInput: data.date_depart,
      dureeInput: data.duree,
      voitureInput: data.voiture,
      marqueInput: data.marque,
      fumeurInput: data.fumeur,
      annimauxInput: data.animaux,
      modeleInput: data.modele,
      couleurvInput: data.couleur,
      placesInput: data.places_disponibles,
      prixInput: data.prix,
      passagersInput: data.passagers,
      imagevInput: data.image_voiture,
  });

  const container = document.getElementById("resultContainer"); // Assurez-vous qu'un conteneur existe
  container.innerHTML = monImage;
}

// Fonction pour générer l'HTML
function getfinitrajetImage(data) {
  const sanitizedData = sanitizeAllFields(data);

  return `
  <div class="mb-3">
      <div class="container p-4">
          <h1 class="text-center text-white">${sanitizedData.datedInput}</h1>
          <h6 class="text-center text-white">${sanitizedData.inputNom} ${sanitizedData.inputPreNom}</h6>
          <h2 class="text-center text-white">${sanitizedData.departInput} -> ${sanitizedData.arriveInput}</h2>
          <h3 class="text-center text-white">${sanitizedData.dureeInput}</h3>
          <h4 class="text-center text-white">${sanitizedData.prixInput}</h4>
          <h5 class="text-center text-white">${sanitizedData.placesInput}</h5>
          <p class="text-center text-white">${sanitizedData.passagersInput}</p>
          <div class="mb-3">
              <div class="row row-cols-2 align-items-center">
                  <p>${sanitizedData.voitureInput}</p>
                  <p>${sanitizedData.fumeurInput}</p>
                  <p>${sanitizedData.annimauxInput}</p>
                  <div class="col">
                      <img class="w-100 rounded" src="${sanitizedData.imagevInput}" alt="Image voiture"/>
                  </div>
                  <p>${sanitizedData.marqueInput}</p>
                  <p>${sanitizedData.modeleInput}</p>
                  <p>${sanitizedData.couleurvInput}</p>
              </div>
              <div class="text-center">
                  <p>Voyage fini!</p>
              </div>
              <div class="text-center">
                  <div><a class="nav-link" href="/avis">Avis</a></div>
                  <div class="col-6 col-lg-4">
                      <a class="nav-link" href="/contact">S.A.V</a>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
}





// fonction pour ajouter des passagers
btntrajetfini.addEventListener("click", ajtcredit);

function ajtcredit() {
    // Récupérer la valeur actuelle des crédits
    const creditsInput = document.getElementById("creditsInput");
    const currentCredits = parseInt(creditsInput.value) || 0; // Récupérer les crédits et s'assurer que c'est un entier

    // Soustraire 2 crédits
    const newCredits = currentCredits - 2;

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
    fetch("https://ecoride.alwaysdata.net/api/security/account/edit", requestOptions)
        .then((response) => response.json())  // Supposer que la réponse est au format JSON
        .then((result) => console.log(result))
        .catch((error) => console.error("Erreur lors de la mise à jour des crédits", error));
}


btntrajetfini.addEventListener("click", async () => {
  // Message à envoyer
  const content = `Votre trajet est terminé. Merci d'avoir voyagé avec nous !
      <button type="button" class="btn btn-danger" id="btnpayer">Payer</button>`;

  // Récupérer tous les passagers à partir du DOM
  const passagerElements = document.querySelectorAll(".passager-row"); // Exemple : éléments avec une classe spécifique
  const passagers = Array.from(passagerElements).map(row => ({
      name: row.querySelector(".passagersInput")?.value.trim(), // Nom du passager
      email: row.querySelector(".EmailInput")?.value.trim(),    // Email du passager
      id: row.getAttribute("data-id")                          // ID unique pour chaque passager
  }));

  // Filtrer les passagers avec des emails valides
  const destinataires = passagers.filter(passager =>
      passager.email && passager.email.includes("@") // Validation rudimentaire pour les emails
  );

  if (destinataires.length === 0) {
      console.error("Aucun destinataire valide trouvé.");
      alert("Aucun destinataire valide trouvé. Vérifiez les emails des passagers.");
      return;
  }

  // Fonction pour envoyer le message à l'API
  const sendMessage = async () => {
      const apiUrl = "https://ecoride.alwaysdata.net/api/send-message";
      const data = {
          content: content,
          recipients: destinataires // Tableau des destinataires
      };

      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${getToken()}` // Assurez-vous que le token est ajouté pour l'authentification
              },
              body: JSON.stringify(data)
          });

          if (!response.ok) {
              const errorData = await response.json();
              console.error('Erreur:', errorData.error || "Erreur inconnue");
              alert("Erreur lors de l'envoi des messages. Veuillez réessayer.");
              return;
          }

          console.log("Messages envoyés avec succès !");
          alert("Messages envoyés avec succès !");
      } catch (error) {
          console.error('Erreur réseau ou serveur:', error);
          alert("Erreur réseau ou serveur. Veuillez vérifier votre connexion.");
      }
  };

  // Appeler la fonction pour envoyer les messages
  await sendMessage();

  // Déclencher la fonction de paiement après l'envoi des messages
  effectuerPaiement(passagers);
});

// Fonction pour effectuer un paiement
function effectuerPaiement(passagers) {
  passagers.forEach(passager => {
      if (passager.name && passager.email) {
          processPayment(passager);
      }
  });
}

// Fonction pour traiter le paiement
function processPayment(passager) {
  const passagerCreditsInput = parseInt(document.getElementById(`creditsInput-${passager.id}`)?.value, 10) || 0;
  const prixInput = parseInt(document.getElementById("prixInput")?.value, 10) || 0;

  // Simuler un conducteur pour le test
  const conducteurCreditsInput = parseInt(document.getElementById("conducteurCreditsInput")?.value, 10) || 0;

  if (passagerCreditsInput >= prixInput) {
      // Mettre à jour les crédits après paiement
      const newPassagerCredits = passagerCreditsInput - prixInput;
      const newConducteurCredits = conducteurCreditsInput + prixInput;

      console.log(`${passager.name} a payé ${prixInput} crédits.`);
      console.log(`Le conducteur a reçu ${prixInput} crédits.`);

      // Afficher les nouveaux soldes
      console.log(`Solde de ${passager.name} : ${newPassagerCredits} crédits`);
      console.log(`Solde du conducteur : ${newConducteurCredits} crédits`);

      // Mise à jour des valeurs dans le DOM
      document.getElementById(`creditsInput-${passager.id}`).value = newPassagerCredits;
      document.getElementById("conducteurCreditsInput").value = newConducteurCredits;
  } else {
      console.error(`Erreur : ${passager.name} n'a pas assez de crédits pour payer.`);
      alert(`${passager.name} n'a pas assez de crédits pour payer.`);
  }
}





getInfoscredits();
function getInfoscredits() {
  let myHeaders = new Headers();
  myHeaders.append("X-Auth-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  // Requête fetch pour récupérer les crédits
  fetch("https://ecoride.alwaysdata.net/api/security/account/me", requestOptions)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              console.error("Impossible de récupérer les informations. Statut:", response.status);
              return null;
          }
      })
      .then(data => {
          if (data) {
              afficherCredits(data);
          }
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données :", error);
      });
}

// Fonction pour afficher les crédits
function afficherCredits(data) {
  const creditsHTML = getcreditsImage({
      creditsInput: data.credits, // Assurez-vous que "credits" correspond au champ dans vos données
  });

  // Insérer l'HTML généré dans un conteneur
  const container = document.getElementById("creditsContainer"); // Assurez-vous qu'un conteneur existe avec cet ID
  container.innerHTML = creditsHTML;
}

// Fonction pour générer l'HTML pour les crédits
function getcreditsImage(data) {
  const { creditsInput } = data;
  const sanitizedCredits = sanitizeHtml(creditsInput);

  return `
  <div class="mb-3">
      <div class="container p-4">
          <h2 class="text-center text-white">Vos crédits : ${sanitizedCredits}</h2>
      </div>
  </div>`;
}
