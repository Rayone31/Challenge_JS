// Précharger les images
const images = {
    gauche: new Image(),
    droite: new Image(),
    avant: new Image(),
    arrière: new Image(),
    entiers: new Image()
};

images.gauche.src = "../assets/images/index/arcade_gauche.jpg";
images.droite.src = "../assets/images/index/arcade_droite.jpg";
images.avant.src = "../assets/images/index/arcade_avant.jpg";
images.arrière.src = "../assets/images/index/arcade_arrière.jpg";
images.entiers.src = "../assets/images/index/arcade_entiers.jpg";

// Fonction pour ajuster le style de fond avec les paramètres spécifiés
function ajusterFond(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "97%";
    document.body.style.overflow = "hidden";
}

ajusterFond(images.entiers.src);

// Écouteur d'événements pour keydown
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowLeft":
            ajusterFond(images.gauche.src);
            break;
        case "ArrowRight":
            ajusterFond(images.droite.src);
            break;
        case "ArrowUp":
            ajusterFond(images.avant.src);
            break;
        case "ArrowDown":
            ajusterFond(images.arrière.src);
            break;
        default:
            break;
    }
});

// Écouteur d'événements pour keyup
document.addEventListener('keyup', function(event) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        ajusterFond(images.entiers.src);
    }
});