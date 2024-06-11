let selectedSquares = [];
let userSelections = [];
let difficulty = 3; 
let gamesWon = 0; 
let size = 3; // 3x3 damier
let isGamePlayable = true; 
let lives = 3;


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
    square.style.backgroundColor = 'yellow';
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
        document.getElementById('square' + i).style.backgroundColor = 'yellow';
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
            gamesWon++;
            difficulty++;
            updateLevelDisplay(); 
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
    errorsCount = 0;
    isGamePlayable = true;
    lives = 3;
    updateLivesDisplay();

    // Supprimer l'ancien damier
    damier.innerHTML = '';

    // Définir une marge constante pour chaque damier
    const marginPerSquare = 5; 

    // Calculer la nouvelle taille de chaque damier pour maintenir la taille globale constante, en tenant compte de la marge
    let totalAvailableSize = initialSize * (100 + 2 * marginPerSquare) - (size * 2 * marginPerSquare);
    let squareSize = totalAvailableSize / size; 

    // Mettre à jour la grille pour la nouvelle taille, en tenant compte de la marge
    damier.style.gridTemplateColumns = `repeat(${size}, ${squareSize}px)`;
    damier.style.width = `${initialSize * (100 + 2 * marginPerSquare)}px`; 
    damier.style.height = `${initialSize * (100 + 2 * marginPerSquare)}px`; 

    // Créer un nouveau damier de la nouvelle taille, en incluant la marge
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement('div');
        square.id = 'square' + i;
        square.style.width = `${squareSize - 2 * marginPerSquare}px`; 
        square.style.height = `${squareSize - 2 * marginPerSquare}px`; 
        square.style.margin = `${marginPerSquare}px`;
        square.style.border = '1px solid black';
        square.style.backgroundColor = 'yellow';
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
            document.getElementById('square' + i).style.backgroundColor = 'yellow';
            document.getElementById('square' + i).addEventListener('click', userClick);
        }
    }, 2000);
}

function userClick() {
    if (!isGamePlayable) {
        return; 
    }
    let squareId = parseInt(this.id.replace('square', ''));
    if (!selectedSquares.includes(squareId)) {
        this.style.backgroundColor = 'red';
        lives--; // Étape 2: Décrémenter les vies
        updateLivesDisplay(); // Mettre à jour l'affichage des vies
        if (lives === 0) {
            // Étape 3: Vérifier si le jeu doit se terminer
            alert('Désolé, vous avez perdu toutes vos vies. Cliquez sur le bouton "Réinitialiser" pour recommencer.');
            isGamePlayable = false;
        }
    } else {
        userSelections.push(squareId);
        this.style.backgroundColor = 'green';
        checkSelections();
    }
}

function updateLivesDisplay() {
    document.getElementById('livesDisplay').innerText = `Vies restantes: ${lives}`;
}

function updateLevelDisplay() {
    document.getElementById('levelDisplay').innerText = `Niveau : ${gamesWon}`;
}