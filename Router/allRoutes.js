import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/acceuil.html", [], "/js/auth/acceuil.js"),
    new Route("/signin", "signin", "/auth/signin.html", [], "/js/auth/signin.js"),
    new Route("/signup", "signup", "/auth/signup.html", [], "/js/auth/signup.js"),
    new Route("/contact", "contact", "/pages/contact.html", [], "/js/contact.js"),
    new Route("/administrateur", "administrateur", "/admin/administrateur.html", ["ROLE_SUPER_ADMIN"], "/admin/administrateur.js"),
    new Route("/trajets", "trajets", "/pages/covoiturage/trajets.html", [], "/pages/covoiturage/trajets.js"),
    new Route("/avis", "Avis", "/pages/avis.html", ["ROLE_USER"], "/js/avis.js"),
    new Route("/signup2", "signupA", "/admin/signup2.html", ["ROLE_SUPER_ADMIN"], "/admin/signup2.js"),
    new Route("/suspendu", "suspendu", "/admin/suspendu.html", ["ROLE_SUPER_ADMIN"], "/admin/suspendu.js"),
    new Route("/utilisateurs", "utilisateurs", "/pages/utilisateurs/utilisateurs.html", ["ROLE_USER"], "/pages/utilisateurs/utilisateurs.js"),
    new Route("/abonees", "abonees", "/admin/abonees.html", ["ROLE_SUPER_ADMIN"], "/admin/abonees.js"),
    new Route("/employers", "employers", "/pages/employers/employers.html", ["ROLE_EMPLOYER"], "/pages/employers/employers.js"),

];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Eco Ride";