//export {input2Role};
//Implémenter le JS de ma page

//recuperation des inputs du formulaire
const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputRole = document.getElementById("RoleInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn2-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");


//ajout d'un envent listener sur chaque input pour valider le formulaire
inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputRole.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", Inscrireemployers);

//Function permettant de valider tout le formulaire
function validateForm(){
    const nomok = validateRequired(inputNom);
    const prenomok = validateRequired(inputPreNom);
    const roleok = validateRequired(inputRole);
    const mailok = validateMail(inputMail);
    const passwordok = validatePassword(inputPassword);
    const passwordConfirmok = validateConfirmationPassword(inputPassword, inputValidationPassword);


    if(nomok && prenomok && roleok && mailok && passwordok && passwordConfirmok){
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

    //function permetant de valider si mot de passe est valide
    function validatePassword(input){
            //Définir mon regex
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

            const passwordUser = input.value;

            if(passwordUser.match(passwordRegex)){
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

//fuction permettant de valider la confirmation du mot de passe  
        function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    
                if(inputPwd.value == inputConfirmPwd.value){
                    inputConfirmPwd.classList.add("is-valid");
                    inputConfirmPwd.classList.remove("is-invalid");
                    return true;
                }
                else{
                    inputConfirmPwd.classList.add("is-invalid");
                    inputConfirmPwd.classList.remove("is-valid");
                    return false;
                }
            }

            function Inscrireemployers(){
                const dataForm = new FormData(formInscription);

                const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "firstName": dataForm.get(inputNom),
  "lastName": dataForm.get(inputPreNom),
  "role": dataForm.get(inputRole),
  "email": dataForm.get(inputMail),
  "password": dataForm.get(inputPassword)
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:8000/api/registration", requestOptions)
  .then(response => {
    if(response.ok){
        return response.json();
    }
    else{
        alert("Erreur lors de l'inscription");
    }
  })
  .then(result => {
    alert("Bravo "+dataForm.get("Prenom")+", cous etes inscrits, vous pouvez vous connecter!");
    document.location.href = "/admin";
    console.log(result)
})
  .catch((error) => console.error(error));
            }
