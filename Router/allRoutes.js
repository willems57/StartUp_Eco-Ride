import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/acceuil.html"),
    new Route("/signin", "signin", "/auth/signin.html"),
    new Route("/signup", "signup", "/auth/signup.html"),
    new Route("/contact", "contact", "/pages/contact.html"),
    new Route("/trajets", "trajets", "/pages/covoiturage/trajets.html"),
    new Route("/avis", "Avis", "/pages/avis.html"),

];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Eco Ride";