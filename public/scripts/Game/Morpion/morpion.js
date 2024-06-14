// Obtenez le canvas et le contexte pour le dessin
let canvas = document.getElementById('morpion');
let ctx = canvas.getContext('2d');

// Définissez la taille de la cellule pour la grille du Morpion
let cellSize = 100;

// Initialisez l'état du jeu
let morpion = [['', '', ''], ['', '', ''], ['', '', '']];

// Définissez le joueur actuel
let joueurActuel = 'X';

// Obtenez les éléments de message et de bouton de réinitialisation du DOM
let message = document.getElementById('message');
let resetButton = document.getElementById('reset');

let modeDeJeu = 'joueurContreJoueur';

// Obtenez les boutons du DOM
let btnJoueurContreJoueur = document.getElementById('btnJoueurContreJoueur');
let btnJoueurContreOrdinateur = document.getElementById('btnJoueurContreOrdinateur');

// Initialisez l'état du jeu
let jeuTermine = false;

// Ajoutez un écouteur d'événements au canvas pour gérer les événements de clic
canvas.addEventListener('click', (e) => {
    // Si le jeu est terminé, ignorez le clic
    if (jeuTermine) return;

    // Calculez quelle cellule a été cliquée en fonction de la position de la souris
    let x = Math.floor(e.offsetX / cellSize);
    let y = Math.floor(e.offsetY / cellSize);

    // Si la cellule cliquée est vide
    if (morpion[y][x] === '') {
        // Mettez à jour l'état du jeu avec le mouvement du joueur actuel
        morpion[y][x] = joueurActuel;

        // Redessinez le plateau de jeu
        dessinerMorpion();

        // Vérifiez si le joueur actuel a gagné
        if (verifierGagnant(joueurActuel)) {
            // Si le joueur actuel a gagné, affichez un message et montrez le bouton de réinitialisation
            message.textContent = `Le joueur ${joueurActuel} a gagné!`;
            jeuTermine = true;
            resetButton.style.display = 'block';
        }
        // Vérifiez si toutes les cases sont remplies
        else if (verifierEgalite()) {
            // Si toutes les cases sont remplies, affichez un message et montrez le bouton de réinitialisation
            message.textContent = `C'est une égalité!`;
            jeuTermine = true;
            resetButton.style.display = 'block';
        }
        else {
            // Changez le joueur actuel
            joueurActuel = joueurActuel === 'X' ? 'O' : 'X';

            // Après le mouvement du joueur, laissez l'ordinateur jouer
            if (!jeuTermine && modeDeJeu === 'joueurContreOrdinateur') {
                mouvementOrdinateur();
            }
        }
    }
});

// Ajoutez un écouteur d'événements au bouton de réinitialisation pour gérer les événements de clic
resetButton.addEventListener('click', () => {
    // Réinitialisez l'état du jeu
    morpion = [['', '', ''], ['', '', ''], ['', '', '']];
    jeuTermine = false;
    joueurActuel = 'X';
    message.textContent = '';
    resetButton.style.display = 'block';
    // Redessinez le plateau de jeu
    dessinerMorpion();
});

// Fonction pour dessiner le Morpion
function dessinerMorpion() {
    // Effacez le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parcourez chaque cellule de la grille
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            // Dessinez un rectangle pour la cellule
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

            // Si la cellule contient un 'X', dessinez un 'X'
            if (morpion[y][x] === 'X') {
                ctx.beginPath();
                ctx.moveTo(x * cellSize + 10, y * cellSize + 10);
                ctx.lineTo((x + 1) * cellSize - 10, (y + 1) * cellSize - 10);
                ctx.moveTo((x + 1) * cellSize - 10, y * cellSize + 10);
                ctx.lineTo(x * cellSize + 10, (y + 1) * cellSize - 10);
                ctx.stroke();
            }
            // Si la cellule contient un 'O', dessinez un 'O'
            else if (morpion[y][x] === 'O') {
                ctx.beginPath();
                ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize / 2 - 10, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
}

// Fonction pour vérifier si un joueur a gagné
function verifierGagnant(joueur) {
    // Définissez toutes les combinaisons gagnantes possibles
    const combinaisonsGagnantes = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    // Parcourez chaque combinaison gagnante
    for (let combinaison of combinaisonsGagnantes) {
        // Si le joueur a une combinaison gagnante, retournez vrai
        if (morpion[combinaison[0][0]][combinaison[0][1]] === joueur &&
            morpion[combinaison[1][0]][combinaison[1][1]] === joueur &&
            morpion[combinaison[2][0]][combinaison[2][1]] === joueur) {
            return true;
        }
    }

    // Si le joueur n'a pas de combinaison gagnante, retournez faux
    return false;
}

// Fonction pour le mouvement de l'ordinateur
function mouvementOrdinateur() {
    setTimeout(function () {
        // Si le jeu est terminé, ignorez le mouvement
        if (jeuTermine) return;

        let x, y;
        do {
            // Choisissez une cellule vide au hasard
            x = Math.floor(Math.random() * 3);
            y = Math.floor(Math.random() * 3);
        } while (morpion[y][x] !== '');

        // Mettez à jour l'état du jeu avec le mouvement de l'ordinateur
        morpion[y][x] = joueurActuel;

        // Redessinez le plateau de jeu
        dessinerMorpion();

        // Vérifiez si l'ordinateur a gagné
        if (verifierGagnant(joueurActuel)) {
            // Si l'ordinateur a gagné, affichez un message et montrez le bouton de réinitialisation
            message.textContent = `L'ordinateur a gagné!`;
            jeuTermine = true;
            resetButton.style.display = 'block';
        } else {
            // Changez le joueur actuel
            joueurActuel = joueurActuel === 'X' ? 'O' : 'X';
        }
    }, 500);
}

// Fonction pour changer le mode de jeu
function changerModeDeJeu(nouveauMode) {
    modeDeJeu = nouveauMode;
}

// Ajoutez des écouteurs d'événements aux boutons
btnJoueurContreJoueur.addEventListener('click', () => {
    changerModeDeJeu('joueurContreJoueur');
    // Réinitialisez l'état du jeu
    morpion = [['', '', ''], ['', '', ''], ['', '', '']];
    jeuTermine = false;
    joueurActuel = 'X';
    message.textContent = '';
    resetButton.style.display = 'block';
    // Redessinez le plateau de jeu
    dessinerMorpion();
});

btnJoueurContreOrdinateur.addEventListener('click', () => {
    changerModeDeJeu('joueurContreOrdinateur');
    // Réinitialisez l'état du jeu
    morpion = [['', '', ''], ['', '', ''], ['', '', '']];
    jeuTermine = false;
    joueurActuel = 'X';
    message.textContent = '';
    resetButton.style.display = 'block';
    // Redessinez le plateau de jeu
    dessinerMorpion();
});

// Fonction pour vérifier si toutes les cases sont remplies
function verifierEgalite() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (morpion[y][x] === '') {
                return false;
            }
        }
    }
    return true;
}


// Dessinez le plateau de jeu initialement
dessinerMorpion();
