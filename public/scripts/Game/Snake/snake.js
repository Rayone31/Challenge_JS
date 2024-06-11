

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
appleImage.onload = function() {
    // L'image est maintenant chargée
};

const headSnakeImageUp = new Image();
headSnakeImageUp.src = '../assets/images/snake/head_snake_haut.jpeg';
headSnakeImageUp.onload = function() {
    // L'image est maintenant chargée
};

const headSnakeImageDown = new Image();
headSnakeImageDown.src = '../assets/images/snake/head_snake_bas.jpeg';
headSnakeImageDown.onload = function() {
    // L'image est maintenant chargée
};

const headSnakeImageLeft = new Image();
headSnakeImageLeft.src = '../assets/images/snake/head_snake_gauche.jpeg';
headSnakeImageLeft.onload = function() {
    // L'image est maintenant chargée
};
const headSnakeImageRight = new Image();
headSnakeImageRight.src = '../assets/images/snake/head_snake_droite.jpeg';
headSnakeImageRight.onload = function() {
    // L'image est maintenant chargée
};

const bodySnakeImagehautbas = new Image();
bodySnakeImagehautbas.src = '../assets/images/snake/body_snake_haut_bas.jpeg';
bodySnakeImagehautbas.onload = function() {
    // L'image est maintenant chargée
};

const bodySnakeImagegauchedroite = new Image();
bodySnakeImagegauchedroite.src = '../assets/images/snake/body_snake_gauche_droite.jpeg';
bodySnakeImagegauchedroite.onload = function() {
    // L'image est maintenant chargée
};

const bodySnakeImagehautgauche = new Image();
bodySnakeImagehautgauche.src = '../assets/images/snake/body_snake_haut_gauche.jpeg';
bodySnakeImagehautgauche.onload = function() {
    // L'image est maintenant chargée
};

const bodySnakeImagehautdroite = new Image();
bodySnakeImagehautdroite.src = '../assets/images/snake/body_snake_haut_droite.jpeg';
bodySnakeImagehautdroite.onload = function() {
    // L'image est maintenant chargée
};

const bodySnakeImagebasgauche = new Image();
bodySnakeImagebasgauche.src = '../assets/images/snake/body_snake_bas_gauche.jpeg';
bodySnakeImagebasgauche.onload = function() {
    // L'image est maintenant chargée
};

const bodySnakeImagebasdroite = new Image();
bodySnakeImagebasdroite.src = '../assets/images/snake/body_snake_bas_droite.jpeg';
bodySnakeImagebasdroite.onload = function() {
    // L'image est maintenant chargée
};

const tailSnakeImageUp = new Image();
tailSnakeImageUp.src = '../assets/images/snake/tail_snake_haut.jpeg';
bodySnakeImagebasdroite.onload = function() {
    // L'image est maintenant chargée
};

const tailSnakeImageDown = new Image();
tailSnakeImageDown.src = '../assets/images/snake/tail_snake_bas.jpeg';
bodySnakeImagebasdroite.onload = function() {
    // L'image est maintenant chargée
};

const tailSnakeImageLeft = new Image();
tailSnakeImageLeft.src = '../assets/images/snake/tail_snake_gauche.jpeg';
bodySnakeImagebasdroite.onload = function() {
    // L'image est maintenant chargée
};

const tailSnakeImageRight = new Image();
tailSnakeImageRight.src = '../assets/images/snake/tail_snake_droite.jpeg';
bodySnakeImagebasdroite.onload = function() {
    // L'image est maintenant chargée
};


// Initialisation de la nourriture
let food = null;

// Initialisation du score et de la vitesse
let score = 0;
let speed = 200;

// Variable pour gérer la pause
let isPaused = true;

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
            let bodyImage;
            const prevPart = snake[index - 1];
            const nextPart = snake[index + 1];

            if (prevPart && nextPart) {
                if (prevPart.y === nextPart.y) {
                    bodyImage = bodySnakeImagegauchedroite;
                } else if (prevPart.x === nextPart.x) {
                    bodyImage = bodySnakeImagehautbas;
                } else if ((prevPart.x < part.x && nextPart.y < part.y) || (nextPart.x < part.x && prevPart.y < part.y)) {
                    bodyImage = bodySnakeImagehautgauche;
                } else if ((prevPart.x > part.x && nextPart.y < part.y) || (nextPart.x > part.x && prevPart.y < part.y)) {
                    bodyImage = bodySnakeImagehautdroite;
                } else if ((prevPart.x < part.x && nextPart.y > part.y) || (nextPart.x < part.x && prevPart.y > part.y)) {
                    bodyImage = bodySnakeImagebasgauche;
                } else if ((prevPart.x > part.x && nextPart.y > part.y) || (nextPart.x > part.x && prevPart.y > part.y)) {
                    bodyImage = bodySnakeImagebasdroite;
                }
            }

            if (bodyImage) {
                ctx.drawImage(bodyImage, part.x, part.y, pixelSize, pixelSize);
            }
        }
        
        if (index === snake.length - 1) {
            let tailImage;
            switch(direction[part.direction]){
                case 'Up':
                    tailImage = tailSnakeImageUp;
                    break;
                case 'Down':
                    tailImage = tailSnakeImageDown;
                    break;
                case 'Left':
                    tailImage = tailSnakeImageLeft;
                    break;
                case 'Right':
                    tailImage = tailSnakeImageRight;
                    break;
            }
            ctx.drawImage(tailImage, part.x, part.y, pixelSize, pixelSize);
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
    ctx.drawImage(appleImage, food.x, food.y, pixelSize * 1.25, pixelSize * 1.25);
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
        // Récupère la dernière partie du serpent
        const tail = snake[snake.length - 1];
        const newPart = {x: tail.x, y: tail.y, direction: tail.direction};

        // Calcule la position de la nouvelle partie basée sur la direction
        switch(direction[tail.direction]){
            case 'Left':
                newPart.x += pixelSize;
                break;
            case 'Up':
                newPart.y += pixelSize;
                break;
            case 'Right':
                newPart.x -= pixelSize;
                break;
            case 'Down':
                newPart.y -= pixelSize;
                break;
        }

        // Ajoute la nouvelle partie au serpent
        snake.push(newPart);
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

// Message de démarrage
function drawStartMessage() {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px Arial';
    ctx.fillStyle = 'Yellow';
    ctx.fillText('Appuyez sur Espace pour commencer', canvas.width / 2, canvas.height / 2);
}

// Gestion de la pause avec la touche espace
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) { 
        isPaused = !isPaused;
        if (!isPaused) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});

// Démarrage du jeu avec la touche Entrée
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { 
        isPaused = false;
    }
});

drawStartMessage();
gameLoop();