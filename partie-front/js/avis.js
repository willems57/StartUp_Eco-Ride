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


const dateavisInput = document.getElementById("dateavisInput");
const pseudoInput = document.getElementById("pseudoInput");
const commavisInput = document.getElementById("commantaireavisInput");
const conducteurInput = document.getElementById("conducteurInput");
const noteInput = document.getElementById("noteInput");
const btnavisajtInput = document.getElementById("btnavisajt");
const avisformajt = document.getElementById("avisformajt");


const avisImage = document.getElementById("allavisImages");








btnavisajtInput.addEventListener("click", ajtavis);

function ajtavis(){

    const dataForm = new FormData(avisformajt);

    const myHeaders = new Headers();
    myHeaders.append("X-Auth-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "name": dataForm.get(pseudoInput.value),
      "note": dataForm.get(noteInput.value),
      "commentaire": dataForm.get(commavisInput.value),
      "createdAt": dataForm.get(dateavisInput.value),
      "conducteur": dataForm.get(conducteurInput.value)
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://ecoride.alwaysdata.net/api/avisvalidation", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}



getInfosservice();

function getInfosservice() {
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://ecoride.alwaysdata.net/api/avis", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Impossible de récupérer les avis.");
            }
            return response.json(); // Conversion de la réponse en JSON
        })
        .then(avis => {
            if (avis.length === 0) {
                avisImage.innerHTML = "<p>Aucun avis disponible.</p>";
            } else {
                displayAvis(avis); // Appel de la fonction pour afficher les avis
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des avis :", error);
        });
}

function displayAvis(avis) {
    avisImage.innerHTML = avis.map(item => {
        const sanitizedPseudo = sanitizeHtml(item.pseudo || "Anonyme");
        const sanitizedCommentaire = sanitizeHtml(item.commentaire || "Aucun commentaire");
        const sanitizedDate = sanitizeHtml(item.date || "Date inconnue");
        const sanitizedNote = sanitizeHtml(item.note || "Non noté");

        return `
            <div class="mb-3">
                <div class="container p-4 bg-light rounded">
                    <h1 class="text-center text-dark">${sanitizedPseudo}</h1>
                    <p class="text-center">${sanitizedDate}</p>
                    <h4 class="text-center text-secondary">Note : ${sanitizedNote}/5</h4>
                    <p class="text-justify">${sanitizedCommentaire}</p>
                </div>
            </div>
        `;
    }).join(""); // Joindre les résultats en une seule chaîne HTML
}
