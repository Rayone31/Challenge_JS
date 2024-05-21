// Importer le module Express
const express = require('express');
const path = require('path');

// Créer une nouvelle application Express
const app = express();

// Définir le dossier public comme dossier statique
app.use(express.static('public'));

// Définir une route GET pour la racine ("/")
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'html', 'index.html'));
});

app.get('/snake', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'html', 'snake.html'));
});

app.get('/tri', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'html', 'tri.html'));
});

app.get('/morpion', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'html', 'morpion.html'));
});

app.get('/VMT', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'html', 'VMT.html'));
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000 au port http://localhost:3000/');
});