let selectedSquares = [];
let userSelections = [];
let difficulty = 3; // Nombre de cases à sélectionner
let gamesWon = 0; // Nombre de parties réussies
let size = 3; // 3x3 damier

// Stocker les valeurs de départ
let initialDifficulty = difficulty;
let initialGamesWon = gamesWon;
let initialSize = size;

// Création du damier
let damier = document.getElementById('damier');
for (let i = 0; i < size * size; i++) {
    let square = document.createElement('div');
    square.id = 'square' + i;
    square.style.width = '100px';
    square.style.height = '100px';
    square.style.border = '1px solid black';
    square.style.backgroundColor = 'blue';
    square.style.borderRadius = '15px';
    damier.appendChild(square);
}

// Coloration aléatoire des cases
while (selectedSquares.length < difficulty) {
    let randomIndex = Math.floor(Math.random() * size * size);
    if (!selectedSquares.includes(randomIndex)) {
        selectedSquares.push(randomIndex);
        document.getElementById('square' + randomIndex).style.backgroundColor = 'white';
    }
}

// Après 2 secondes, les cases deviennent bleues
setTimeout(() => {
    for (let i = 0; i < size * size; i++) {
        document.getElementById('square' + i).style.backgroundColor = 'blue';
    }
}, 2000);

// Ajout d'un écouteur d'événements pour chaque case
for (let i = 0; i < size * size; i++) {
    document.getElementById('square' + i).addEventListener('click', userClick);
}

document.getElementById('resetButton').addEventListener('click', function() {
    difficulty = initialDifficulty;
    gamesWon = initialGamesWon;
    size = initialSize;
    resetTest();
});

// Vérification des sélections de l'utilisateur
function checkSelections() {
    if (userSelections.length === difficulty) {
        userSelections.sort();
        selectedSquares.sort();
        if (JSON.stringify(userSelections) === JSON.stringify(selectedSquares)) {
            //alert('Bravo! Vous avez réussi le test de mémoire visuelle.');
            gamesWon++;
            difficulty++;
            if (gamesWon % 3 === 0) {
                size++;
            }
            setTimeout(() => {
            resetTest();
            }, 1000);
        } else {
            alert('Désolé, vous avez échoué au test de mémoire visuelle. Cliquez sur le bouton "Réinitialiser" pour recommencer.');
        }
    }
}

function resetTest() {
    // Réinitialiser les tableaux
    selectedSquares = [];
    userSelections = [];

    // Supprimer l'ancien damier
    damier.innerHTML = '';

    // Mettre à jour la grille
    damier.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    damier.style.width = `${size * 120}px`; 
    damier.style.height = `${size * 120}px`;

    // Créer un nouveau damier de la nouvelle taille
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement('div');
        square.id = 'square' + i;
        square.style.width = '100px';
        square.style.height = '100px';
        square.style.border = '1px solid black';
        square.style.backgroundColor = 'blue';
        square.style.borderRadius = '15px';
        damier.appendChild(square);
    }

    // Recolorer aléatoirement les cases
    while (selectedSquares.length < difficulty) {
        let randomIndex = Math.floor(Math.random() * size * size);
        if (!selectedSquares.includes(randomIndex)) {
            selectedSquares.push(randomIndex);
            document.getElementById('square' + randomIndex).style.backgroundColor = 'white';
        }
    }

    // Après 2 secondes, les cases deviennent bleues et les écouteurs d'événements sont ajoutés
    setTimeout(() => {
        for (let i = 0; i < size * size; i++) {
            document.getElementById('square' + i).style.backgroundColor = 'blue';
            document.getElementById('square' + i).addEventListener('click', userClick);
        }
    }, 2000);
}

function userClick() {
    userSelections.push(parseInt(this.id.replace('square', '')));
    this.style.backgroundColor = 'white';
    checkSelections();
}