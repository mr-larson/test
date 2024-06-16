export function animateDice(value) {
    const diceElement = document.getElementById('dice');
    diceElement.textContent = value;
    diceElement.style.animation = 'none';
    diceElement.offsetHeight; // Trigger reflow
    diceElement.style.animation = 'rollDice 1s ease-out';
}
