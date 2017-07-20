/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, n1, n2, gameOn;

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0; 
    n1 = prompt("What is the name of player 1?");
    n2 = prompt("What is the name of player 2?");
    gameOn = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = n1;
    document.getElementById('name-1').textContent = n2;
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
   
    if (gameOn) {
        var dice = Math.floor((Math.random() * 6) + 1);

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + ".png";    

        document.querySelector('#current-' + activePlayer).textContent = dice;

        if (dice > 1) {
            // add score
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            // move to next player
            document.getElementById('current-' + activePlayer).textContent = '0';
            nextPlayer();
        }   
    }
}); 

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gameOn) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        if (scores[activePlayer] >= 10) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            changeDice();
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gameOn = false;
        } else {
            nextPlayer();
        }

    }

    
});

function nextPlayer() {
    
        
        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        roundScore = 0;
        document.getElementById("current-0").textContent = 0;
        document.getElementById("current-1").textContent = 0;
        document.querySelector(".player-0-panel").classList.toggle('active');
        document.querySelector(".player-1-panel").classList.toggle('active');
        changeDice();
}

function changeDice() {
    document.querySelector(".dice").style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);