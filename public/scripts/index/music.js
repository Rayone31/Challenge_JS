document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('muteButton').addEventListener('click', function() {
        var audio = document.getElementById('audio');
        if (!audio.paused) {
            audio.muted = !audio.muted; 
        } else {
            audio.play(); 
        }
    });
});