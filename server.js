// Importez le module HTTP
const http = require('http');

// Créez un serveur HTTP de base
const server = http.createServer((req, res) => {
    // Renvoyez du texte en clair à l'utilisateur
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bonjour ! Ceci est un serveur local en JavaScript.');
});

// Écoutez sur le port 3000
server.listen(3000, () => {
    console.log('Serveur en cours d\'écoute sur le port 3000...');
});
