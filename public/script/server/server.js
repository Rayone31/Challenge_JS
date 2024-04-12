// Importer le module Express
const express = require('express');
const path = require('path');

// Créer une nouvelle application Express
const app = express();

// Définir le dossier public comme dossier statique
app.use(express.static('public'));

// Définir une route GET pour la racine ("/")
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000 au port http://localhost:3000/');
});
