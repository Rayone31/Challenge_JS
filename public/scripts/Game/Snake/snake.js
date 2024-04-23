// Récupération du canvas et du contexte de dessin
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Récupération de l'élément pour le score
const scoreElement = document.getElementById('score');

// Directions possibles pour le serpent
const direction ={37:'Left',38:'Up',39:'Right',40:'Down'};

// Initialisation du serpent
const snake = [
    {x: 200, y: 200, direction: 39},
    {x: 180, y: 200, direction: 39}
]; 

// Taille d'un pixel
const pixelSize = 20;

// Chargement de l'image
const appleImage = new Image();
appleImage.src = '../assets/images/snake/apple.jpeg';

const headSnakeImageUp = new Image();
headSnakeImageUp.src = '../assets/images/snake/head_snake_haut.jpeg';

const headSnakeImageDown = new Image();
headSnakeImageDown.src = '../assets/images/snake/head_snake_bas.jpeg';

const headSnakeImageLeft = new Image();
headSnakeImageLeft.src = '../assets/images/snake/head_snake_gauche.jpeg';

const headSnakeImageRight = new Image();
headSnakeImageRight.src = '../assets/images/snake/head_snake_droite.jpeg';

// Initialisation de la nourriture
let food = null;

// Initialisation du score et de la vitesse
let score = 0;
let speed = 200;

// Variable pour gérer la pause
let isPaused = false;

// Dessin du serpent
function drawSnake(){
    snake.forEach((part, index) => {
        if (index === 0) {
            // Dessin de la tête du serpent
            let headImage;
            switch(direction[part.direction]){
                case 'Up':
                    headImage = headSnakeImageUp;
                    break;
                case 'Down':
                    headImage = headSnakeImageDown;
                    break;
                case 'Left':
                    headImage = headSnakeImageLeft;
                    break;
                case 'Right':
                    headImage = headSnakeImageRight;
                    break;
            }
            ctx.drawImage(headImage, part.x, part.y, pixelSize, pixelSize);
        } else {
            // Dessin du corps du serpent
            ctx.fillStyle = 'green';
            ctx.fillRect(part.x, part.y, pixelSize, pixelSize);
        }
    });
}

// Mouvement du serpent
function moveSnake(){
   const head = {x: snake[0].x, y: snake[0].y}; 
   switch(direction[snake[0].direction]){ 
       case 'Left':
           head.x -= pixelSize;
           break;
       case 'Up':
           head.y -= pixelSize;
           break;
       case 'Right':
           head.x += pixelSize;
           break;
       case 'Down':
           head.y += pixelSize;
           break;
   }
   head.direction = snake[0].direction; 
   snake.unshift(head);
   snake.pop();
}

// Changement de direction du serpent
function changeDirection(event){
    if(direction[event.keyCode]){
        const newDirection = direction[event.keyCode];
        const currentDirection = direction[snake[0].direction];
        if ((newDirection === 'Left' && currentDirection !== 'Right') ||
            (newDirection === 'Right' && currentDirection !== 'Left') ||
            (newDirection === 'Up' && currentDirection !== 'Down') ||
            (newDirection === 'Down' && currentDirection !== 'Up')) {
            snake[0].direction = event.keyCode;
        }
    }
 }
 document.addEventListener('keydown', changeDirection);

// Affichage du score
function updateScore(){
    score = snake.length - 1;
    scoreElement.innerText = 'Score: ' + score;

    // Augmentation de la vitesse tous les 5 points
    if (score % 5 === 0) {
        speed = Math.max(50, speed - 10); // La vitesse minimale est de 50
    }
}

// Dessin de la nourriture
function drawFood(){
    ctx.drawImage(appleImage, food.x, food.y, pixelSize, pixelSize);
}

// Création d'un nombre aléatoire pour la position de la nourriture
function randomTen(min, max){
    return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

// Création de la nourriture
function createFood(){
    food = {
        x: randomTen(0, canvas.width - pixelSize),
        y: randomTen(0, canvas.height - pixelSize)
    };
    snake.forEach((part) => {
        if(part.x === food.x && part.y === food.y){
            createFood();
        }
    });
}
createFood();

// Gestion de l'ingestion de la nourriture
function eatFood(){
    if(snake[0].x === food.x && snake[0].y === food.y){
        snake.push({});
        createFood();
        updateScore();
    }
}

// Vérification des collisions
function checkCollision(){
    if(snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height){
        window.location.reload();
    }
    snake.forEach((part, index) => {
        if(index){
            if(part.x === snake[0].x && part.y === snake[0].y){
                window.location.reload();
            }
        }
    });
}

// Boucle de jeu
function gameLoop(){
    if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        checkCollision();
        eatFood();
        drawFood();
        drawSnake();
    }
    setTimeout(gameLoop, speed);
}
gameLoop();

// Gestion de la pause avec la touche espace
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) { 
        isPaused = !isPaused;
    }
});