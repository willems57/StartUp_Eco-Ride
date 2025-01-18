import { sanitizeHtml, getToken } from "../../js/script.js";

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
const inputCredit = document.getElementById("creditInput");
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
const btnpayer = document.getElementById("btnpayer");



btnpayer.addEventListener("click", effectuerPaiement);
// Fonction pour effectuer un paiement
function effectuerPaiement(passagersInput) {
 
  const passagers = [passagersInput];
  passagers.forEach(passager => {
    if (passager.value !== "") {
      processPayment();
    }
  });
}


function processPayment() {

  const passager ={
name: [
  document.getElementById("passagersInput").value,
],
creditsInput: parseInt(document.getElementById("creditsInput").value, 10) || 0,
};

const conducteurInput = {
    name: `${inputNom.value} ${inputPreNom.value}`,
    creditsInput: parseInt(document.getElementById("creditsInput").value, 10) || 0,
};



  if ([passager.creditsInput >= prixInput.value]) {
    [passager.creditsInput -= prixInput]; // Passager paye
    conducteurInput.creditsInput += prixInput; // Conducteur reçoit

    console.log(`${passager.value} a payé ${prixInput.value} crédits.`);
    console.log(`${conducteurInput.value} a reçu ${prixInput.value} crédits.`);

    // Afficher les soldes mis à jour
    console.log(`Solde de ${passager.value} : ${passager.creditsInput} crédits`);
    console.log(`Solde de ${conducteurInput.value} : ${conducteurInput.creditsInput} crédits`);
  } else {
    console.log(`Erreur : ${passager.value} n'a pas assez de crédits pour payer.`);
  }
}





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
    
    fetch("http://127.0.0.1:8000/api/trajets", requestOptions)
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

fetch("http://127.0.0.1:8000/api/trajets", requestOptions)
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

fetch("http://127.0.0.1:8000/api/trajets", requestOptions)
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

fetch("http://127.0.0.1:8000/api/trajetsencours", requestOptions)
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
    
    fetch("http://127.0.0.1:8000/api/voitures", requestOptions)
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

fetch("http://127.0.0.1:8000/api/voitures", requestOptions)
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

    fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
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
                          <button type="button" class="btn btn-danger" id="btnvehiculesupp">Supprimer</button>
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

    fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
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

fetch("http://127.0.0.1:8000/api/trajetsencours", requestOptions)
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
  fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
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
    
    fetch("http://127.0.0.1:8000/api/trajetsfini", requestOptions)
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
  fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
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
                  <button type="button" class="btn btn-danger" id="btnpayer">Payer</button>
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
    fetch("http://127.0.0.1:8000/api/security/account/edit", requestOptions)
        .then((response) => response.json())  // Supposer que la réponse est au format JSON
        .then((result) => console.log(result))
        .catch((error) => console.error("Erreur lors de la mise à jour des crédits", error));
}




btntrajetfini.addEventListener("click", () => {
  const message = "Votre trajet est terminé. Merci d'avoir voyagé avec nous !"; // Message
  const content = message.value.trim();
  const destinataires = passagers.value.trim();
  // Collecte des noms et emails des passagers
  const passagers = [
      { name: document.getElementById("passagersInput").value, email: document.getElementById("EmailInput1").value },
      ];

      sendMessage();

  // Fonction pour envoyer les données à l'API
const sendMessage = async () => {
  const apiUrl = 'http://127.0.0.1:8000/api/send-message';
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
});

  // Filtrer les passagers avec des emails valides
  const destinataires = passagers
      .filter(passager => passager.email && passager.email.includes("@"))
      .map(passager => ({ email: passager.email, name: passager.name }));

  if (destinataires.length === 0) {
      console.error("Aucun destinataire valide trouvé.");
      return;
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
  fetch("http://127.0.0.1:8000/api/security/account/me", requestOptions)
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
