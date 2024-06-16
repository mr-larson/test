export function handleShoot(game, dice) {
    const { playerCurrent, playerNumber } = game.ball.getCurrentPlayer();
    const teamName = playerCurrent === 'internal' ? 'interne' : 'externe';
    const success = getShootSuccess(game.ball.player);
    let message;

    if (dice > success) {
        message = `Numéro ${playerNumber} de l'équipe ${teamName} réussit le tir!`;
        animateBallToGoal(game, playerCurrent);
    } else {
        let newPlayer = game.ball.player.includes('internal') ? 'externalGoalkeeper' : 'internalGoalkeeper';
        const newPlayerNumber = document.getElementById(newPlayer).textContent;
        const newTeamName = playerCurrent === 'internal' ? 'externe' : 'interne';
        message = `Numéro ${playerNumber} de l'équipe ${teamName} échoue le tir! Numéro ${newPlayerNumber} de l'équipe ${newTeamName} récupère la balle.`;
        game.ball.setPlayer(newPlayer);
        game.ball.updatePosition(game.ball.player);
    }

    document.getElementById('commentary').innerHTML = message;
}

function getShootSuccess(player) {
    if (player.includes('Forward')) {
        return 5;
    } else if (player.includes('Midfielder')) {
        return 7;
    } else if (player.includes('Defender')) {
        return 9;
    } else {
        return 10;
    }
}

function animateBallToGoal(game, playerCurrent) {
    const ballElement = document.getElementById('ball');
    ballElement.style.transition = 'left 0.5s ease, top 0.5s ease';
    if (playerCurrent === 'internal') {
        ballElement.style.left = '100%'; // Position near the right goal
        ballElement.style.top = '50%';
    } else {
        ballElement.style.left = '-2%'; // Position near the left goal
        ballElement.style.top = '50%';
    }
    setTimeout(() => {
        updateScoreAfterShoot(game, playerCurrent);
    }, 1000);
}

function updateScoreAfterShoot(game, playerCurrent) {
    if (playerCurrent === 'internal') {
        game.scoreInternal++;
        game.playerScoredLast = 'internal';
    } else {
        game.scoreExternal++;
        game.playerScoredLast = 'external';
    }
    game.updateScore();
    game.animateActionButtons(); // Animate action buttons when a goal is scored
    setTimeout(() => game.initGame(), 2000);
}
