// Récupération de l'élément canvas et de son contexte de dessin
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variable pour contrôler l'arrêt du tri
let stop = false;

// Fonction pour générer un nombre aléatoire entre 0 et 99
const random = () => Math.floor(Math.random() * 100);

// Fonction pour dessiner un nombre à une position spécifiée sur le canvas
const drawNumber = (number, x, y, color = 'black') => {
    ctx.fillStyle = color;
    ctx.font = '20px Arial';
    ctx.fillText(number, x, y);

    // Dessiner un rectangle dont la hauteur est proportionnelle à la valeur du nombre
    let height = number * 2;
    ctx.fillRect(x, y - height - 20, 20, height);
}


// Fonction pour effacer le canvas et dessiner tous les nombres dans le tableau donné
const drawNumbers = (numbers, currentIndex = -1) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    numbers.forEach((number, i) => drawNumber(number, 50 + i * 50, 300, i === currentIndex ? 'red' : 'black'));
}

// Création d'un tableau de 15 nombres aléatoires
let numbers = Array.from({length: 15}, random);

// Dessin des nombres initiaux sur le canvas
drawNumbers(numbers);

// Fonction pour effectuer un tri à bulles sur le tableau donné
function bubbleSort(arr, i = 0, j = 0) {
    let len = arr.length;
    if (i < len) {
        if (j < len - i - 1) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                drawNumbers(numbers, j + 1);
            }
            setTimeout(() => bubbleSort(arr, i, j + 1), 250);
        } else {
            setTimeout(() => bubbleSort(arr, i + 1, 0), 250);
        }
    }
}

// Ajout d'un écouteur d'événements au bouton "start" pour démarrer le tri
document.getElementById('start').addEventListener('click', () => {
    stop = false;
    bubbleSort(numbers);
});

// Ajout d'un écouteur d'événements au bouton "stop" pour arrêter le tri
document.getElementById('stop').addEventListener('click', () => stop = true);

// Ajout d'un écouteur d'événements au bouton "reset" pour réinitialiser le tableau de nombres et le dessin
document.getElementById('reset').addEventListener('click', () => {
    numbers = Array.from({length: 15}, random);
    drawNumbers(numbers);
});