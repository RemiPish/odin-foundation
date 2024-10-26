const MAX_SCORE = 5;
let currentRound = 1;
let playerScore, cpuScore = 0;

function main() {
    resetGameState()
    updateScoreDisplay();
}

function resetGameState() {
    playerScore = 0;
    cpuScore = 0;
    currentRound = 1;
    document.getElementById("result").textContent = "";
    document.getElementById("final-result").textContent = "";
    rock_elt.disabled = false;
    paper_elt.disabled = false;
    scissors_elt.disabled = false;
    document.getElementById("playerScore").style.color = "#1F2937";
    document.getElementById("cpuScore").style.color = "#1F2937";
}
function playRPS(playerChoice) {
    if (playerScore < MAX_SCORE && cpuScore < MAX_SCORE) {
        const choices = ["rock", "paper", "scissors"];
        const cpuChoice = choices[Math.floor(Math.random() * 3)];

        if (playerChoice === cpuChoice) {
            roundResult = "tie";
        }
        else if ((playerChoice === "rock" && cpuChoice === "scissors") || (playerChoice === "paper" && cpuChoice === "rock") || (playerChoice === "scissors" && cpuChoice === "paper")) {
            roundResult = "win";
            playerScore++;
        }
        else {
            roundResult = "lose";
            cpuScore++;
        }
        displayRoundResult(playerChoice, cpuChoice, roundResult);
        updateScoreDisplay();

        if (playerScore === MAX_SCORE || cpuScore === MAX_SCORE) {
            displayFinalResult();
            rock_elt = document.getElementById('rock-rps');
            paper_elt = document.getElementById('paper-rps');
            scissors_elt = document.getElementById('scissors-rps');
            rock_elt.disabled = true;
            paper_elt.disabled = true;
            scissors_elt.disabled = true;
            if (playerScore === MAX_SCORE)
                document.getElementById("playerScore").style.color = "green";
            else document.getElementById("cpuScore").style.color = "red";
        }
        else currentRound++;
    }
}

function updateScoreDisplay() {
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("cpuScore").textContent = cpuScore;
    document.getElementById("round").textContent = currentRound;
}

function displayRoundResult(playerChoice, cpuChoice, result) {
    let resultLine = (result === "win") ? 'You win!' : ((result === "lose") ? 'You lose!' : 'It\'s a tie.');
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Player chose ${playerChoice}, CPU chose ${cpuChoice}. ${resultLine}`;
}

function displayFinalResult() {
    const resultElement = document.getElementById("final-result");
    resultElement.textContent = (playerScore === MAX_SCORE) ? 'You won the game!' : 'You lost the game.';
}

main();