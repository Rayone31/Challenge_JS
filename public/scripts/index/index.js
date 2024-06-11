const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let selectedIndex = 0;
const games = ['Snake', 'Morpion', 'Tri à bulle', 'Visual Memory Test', 'Calculateur de frappe'];
const gameUrls = ['/snake', '/morpion', '/tri', '/VMT', '/cdf'];
const gameImages = [];
const imageFilenames = ['snake.jpg', 'morpion.jpg', 'tri.jpg', 'VMT.jpg', 'cdf.jpg'];

imageFilenames.forEach((filename, index) => {
    const img = new Image();
    img.onload = function() {
        gameImages[index] = img;
        if (index === 0) draw(); 
    };
    img.src = `/assets/images/index/${filename}`;
});

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function draw() {
    ctx.fillStyle = '#2D2D2D'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let outerRectX = 5;
    let outerRectY = 5;
    let outerRectWidth = canvas.width - 370;
    let outerRectHeight = 300 + 50;
    let outerRectRadius = 20;

    ctx.fillStyle = '#007FFF'; 
    drawRoundedRect(ctx, outerRectX, outerRectY, outerRectWidth, outerRectHeight, outerRectRadius);

    let titleRectX = outerRectX + 10;
    let titleRectY = outerRectY + 10;
    let titleRectWidth = outerRectWidth - 20;
    let titleRectHeight = 40;
    ctx.fillStyle = '#FFA500'; 
    ctx.fillRect(titleRectX, titleRectY, titleRectWidth, titleRectHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(titleRectX, titleRectY, titleRectWidth, titleRectHeight);

    let rightRectX = canvas.width - 360; 
    let rightRectY = 5;
    let rightRectWidth = 350; 
    let rightRectHeight = canvas.height - 10;

    // Définir la couleur et dessiner le rectangle
    ctx.fillStyle = '#2F2E2E'; 
    ctx.fillRect(rightRectX, rightRectY, rightRectWidth, rightRectHeight);
    drawRoundedRect(ctx, rightRectX, rightRectY, rightRectWidth, rightRectHeight, 10, '#2F2E2E', 'black');

    let innerRectX = rightRectX + 20; 
    let innerRectY = rightRectY + 70; 
    let innerRectWidth = rightRectWidth - 40;
    let innerRectHeight = 175;
    
    // Définir la couleur et dessiner le rectangle intérieur
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(innerRectX, innerRectY, innerRectWidth, innerRectHeight);
    
    // Optionnel : Ajouter un contour au rectangle intérieur
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(innerRectX, innerRectY, innerRectWidth, innerRectHeight);

    if (gameImages[selectedIndex]) {
        ctx.drawImage(gameImages[selectedIndex], rightRectX + 20, rightRectY + 70, rightRectWidth - 40, 175);
    }

    ctx.font = '23px "Press Start 2P"'; 
    ctx.fillStyle = 'white';
    ctx.fillText("Liste de jeu", titleRectX + 15, titleRectY + 28);


    games.forEach((game, index) => {
        const gameNumber = (index < 9 ? '0' : '') + (index + 1);
        const text = `${gameNumber}. ${game}`;
        let x = outerRectX + 20;
        let y = titleRectY + titleRectHeight + 10 + (index * 50);
        let width = titleRectWidth - 10;
        let height = 40;
        let radius = 10; 
    
        // Modifier ici pour assombrir les rectangles non sélectionnés
        ctx.fillStyle = selectedIndex === index ? '#00FF00' : '#636363'; 
        drawRoundedRect(ctx, x, y, width, height, radius);
    
        ctx.font = '19px "Press Start 2P"';
        ctx.fillStyle = selectedIndex === index ? '#000' : 'white';
        ctx.fillText(text, x + 5, y + 28); 
    });
}

function moveMarker(e) {
    if (e.key === 'ArrowUp' && selectedIndex > 0) {
        selectedIndex--;
    } else if (e.key === 'ArrowDown' && selectedIndex < games.length - 1) {
        selectedIndex++;
    } else if (e.key === 'Enter') {
        window.location.href = gameUrls[selectedIndex];
    }

    draw();
}

draw();
window.addEventListener('keydown', moveMarker);