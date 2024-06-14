const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const start = document.getElementById('start');
    const reset = document.getElementById('reset');
    const score = document.getElementById('score');
    const precision = document.getElementById('precision');
    const timer = document.getElementById('timer');
    const userInput = document.getElementById('userInput');

    let time = 0;
    let isStarted = false;
    let phrases = [];
    let randomPhrase = '';
    let lineLengths = [];
    let correctWords = 0;
    let startTime = null;
    let totalTypedLetters = 0;
    let incorrectLetters = 0;
    
    fetch('../data/cdf.json')
        .then(response => response.json())
        .then(data => {
            phrases = data;
            start.disabled = false;
        });

    
    // Fonction pour envelopper le texte
    function wrapText(context, text, x, y, maxWidth, lineHeight, userInputValue) {
        var words = text.split(' ');
        var line = '';
        var lines = [];

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            }
            else {
                line = testLine;
            }
        }
        lines.push(line);

        var totalLength = 0;
        for (var i = 0; i < lines.length; i++) {
            if (totalLength <= userInputValue.length) {
                colorText(context, lines[i], x, y, userInputValue.substring(totalLength));
                totalLength += lines[i].length;
            } else {
                context.fillText(lines[i], x, y);
            }
            y += lineHeight;
        }
    }
    // Fonction pour colorer le texte en fonction de l'entrée utilisateur
    function colorText(context, line, x, y, userInputValue) {
        let totalLength = 0;
        for (let i = 0; i < line.length; i++) {
            let letterWidth = context.measureText(line[i]).width;
            if (i < userInputValue.length && i < line.length) {
                totalTypedLetters++;
                if (userInputValue[i] !== line[i]) {
                    incorrectLetters++;
                    context.fillStyle = '#ff0000';
                } else {
                    context.fillStyle = 'green';
                }
            } else if (i === userInputValue.length) {
                context.fillStyle = 'blue';
                context.fillRect(x, y + 5, letterWidth, 2); 
                context.fillStyle = 'black';
            } else {
                context.fillStyle = 'black';
            }
            context.fillText(line[i], x, y);
            x += letterWidth;
        }
        if (userInputValue.length === line.length) {
            context.fillStyle = 'blue';
            context.fillRect(x, y + 5, 2, 2); 
        }
    }

    // Ajout d'un écouteur d'événements pour le bouton "start"
    start.addEventListener('click', () => {
        if (!isStarted) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const randomIndex = Math.floor(Math.random() * phrases.length);
            randomPhrase = phrases[randomIndex].phrase;
            
            ctx.font = '20px Arial';
            ctx.fillStyle = 'black'; 
            var x = 50;
            var y = canvas.height / 10; 
            var maxWidth = canvas.width - 100;
            var lineHeight = 25;
            wrapText(ctx, randomPhrase, x, y, maxWidth, lineHeight, '');

            startTime = Date.now();
            timer.textContent = `Temps : 0s`;

            intervalId = setInterval(() => {
                time = Math.floor((Date.now() - startTime) / 1000);
                timer.textContent = `Temps : ${time}s`;
            }, 1000);

            isStarted = true;

            userInput.value = '';
            userInput.focus();

            setTimeout(() => {
                clearInterval(intervalId);
                let speed = correctWords / (time / 60);
                let precisionScore = 100 - (incorrectLetters / totalTypedLetters * 100);
                score.textContent = `Score : ${speed.toFixed(2)}`; 
                precision.textContent = `Précision : ${precisionScore.toFixed(2)}%`;
                alert(`Le temps est écoulé ! Votre vitesse d'écriture est de ${speed.toFixed(2)} mots corrects par minute. Votre score de précision est de ${precisionScore.toFixed(2)}%.`);
                isStarted = false;
            }, 60000);
        }
    });

    // Ajout d'un écouteur d'événements pour le bouton "reset"
    reset.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        time = 0;
        timer.textContent = `Temps : ${time}s`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        totalTypedLetters = 0;
        incorrectLetters = 0;
        isStarted = false;
        startTime = null; 
    });

    // Ajout d'un écouteur d'événements pour le champ de texte
    userInput.addEventListener('input', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black'; 
        var x = 50;
        var y = canvas.height / 10; 
        var maxWidth = canvas.width - 100;
        var lineHeight = 25;
        wrapText(ctx, randomPhrase, x, y, maxWidth, lineHeight, userInput.value);

        // Compter le nombre de bons mots
        correctWords = 0;
        let userWords = userInput.value.split(' ');
        let phraseWords = randomPhrase.split(' ');
        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === phraseWords[i]) {
                correctWords++;
            }
        }
    });