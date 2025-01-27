
const nomcInput = document.getElementById("NomInput");
const mailcInput = document.getElementById("EmailInput");
const msgcInput = document.getElementById("messagecInput");
const datecInput = document.getElementById("datecInput");
const contactform = document.getElementById("contactfrom");
const btncontactInput = document.getElementById("btncontactajt");

btncontactInput.addEventListener("click", contact);

function contact(){
    const dataForm = new FormData(contactform);
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const raw = JSON.stringify({
        "date": dataForm.get(datecInput),
        "name": dataForm.get(nomcInput),
      "mail": dataForm.get(mailcInput),
      "message": dataForm.get(msgcInput)
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://ecoride.alwaysdata.net/api/contacts", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

