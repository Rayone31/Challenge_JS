let morpion = ['', '', '', '', '', '', '', '', ''];
let joueurActuel = 'X';
const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.querySelector('#reset');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (morpion[index] === '') {
            morpion[index] = joueurActuel;
            cell.textContent = joueurActuel;
            joueurActuel = joueurActuel === 'X' ? 'O' : 'X';
        }
    });
});
resetButton.addEventListener('click', () => {
    morpion = ['', '', '', '', '', '', '', '', ''];
    joueurActuel = 'X';
    cells.forEach(cell => cell.textContent = '');
});