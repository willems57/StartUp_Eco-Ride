import { getToken } from "../js/script";
//recuperation des inputs du formulaire
const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputRole = document.getElementById("RoleInput");
const inputMail = document.getElementById("EmailInput");
const btnValidation = document.getElementById("btn-validation-modification");
const formInscription = document.getElementById("formulaireInscription");


//ajout d'un envent listener sur chaque input pour valider le formulaire
inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputRole.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);


btnValidation.addEventListener("click", suspendreutilisateur);

//Function permettant de valider tout le formulaire
function validateForm(){
    const nomok = validateRequired(inputNom);
    const prenomok = validateRequired(inputPreNom);
    const roleok = validateRequired(inputRole);
    const mailok = validateMail(inputMail);

    if(nomok && prenomok && roleok && mailok){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }
}

//function permettent de valider si un input est rempli
function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true; 
    }

    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//function permetant de valider si un mail est valide
function validateMail(input){
        //Définir mon regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const mailUser = input.value;

        if(mailUser.match(emailRegex)){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid"); 
            return true;
        }
    
        else{
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }



    function suspendreutilisateur(){
                const dataForm = new FormData(formInscription);
                myHeaders.append("X-Auth-TOKEN", getToken());

                const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "firstName": dataForm.get(inputNom),
  "lastName": dataForm.get(inputPreNom),
  "role": dataForm.get(inputRole),
  "email": dataForm.get(inputMail)
});

const requestOptions = {
  method: "PUT",
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:8000/api/account/edit", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}