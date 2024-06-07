const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
    
        let selectedIndex = 0;
        const games = ['Snake', 'Morpion', 'Tri à bulle','Visual Memory Test', 'Calculateur de frappe'];
        const gameUrls = ['/snake', '/morpion', '/tri','/VMT', '/cdf'];
        const markerYPositions = [200, 250, 300, 350];
    
        function draw() {
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            ctx.fillStyle = 'white';
            ctx.font = '50px Arial';
            ctx.fillText('Liste des jeux', 50, 100);
    
            ctx.font = '30px Arial';
            games.forEach((game, index) => {
                ctx.fillText(game, 50, markerYPositions[index]);
            });
    
            ctx.fillStyle = 'yellow';
            ctx.fillRect(30, markerYPositions[selectedIndex] - 20, 10, 30);
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