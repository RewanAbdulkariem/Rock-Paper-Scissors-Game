let choices = ["rock", "paper", "scissors"];
let rounds = 1;

const humanImageChoice = document.querySelectorAll(".choice");
const resultMessage = document.getElementById("result-message");
const humanScore = document.getElementById("human-score");
const computerScore = document.getElementById("computer-score");
const roundNum = document.getElementById("round-num");
const scoreboardContainer = document.querySelector(".scoreboard-container");
const resetButton = document.getElementById("reset-button");
const userChoice = document.getElementById("user-choice");
const finalResult = document.getElementById("final-result");
const playerImage = document.getElementById("player-image");
const computerImage = document.getElementById("computer-image");
let imageToImagePath = {
    rock:"Photos/rock_image.png",
    paper:"Photos/paper_image.png",
    scissors: "Photos/scissors_image.png",
    q: "Photos/q.png"
}

function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3);
    return choices[randomChoice];
}

function updateImages(humanChoice, computerChoice) {

    playerImage.src = `${imageToImagePath[humanChoice]}`;
    computerImage.src = `${imageToImagePath[computerChoice]}`;
}

function playRound(humanChoice, computerChoice) {

    playerImage.classList.remove("winner");
    computerImage.classList.remove("winner");

    if ((humanChoice == "paper" && computerChoice == "rock") ||
        (humanChoice == "rock" && computerChoice == "scissors") ||
        (humanChoice == "scissors" && computerChoice == "paper")) {
        humanScore.textContent = Number(humanScore.textContent) + 1;
        playerImage.classList.add("winner");
        return { result: `You win! ${humanChoice} beats ${computerChoice}`, type: "win" };
    } else if ((humanChoice == "rock" && computerChoice == "paper") ||
        (humanChoice == "scissors" && computerChoice == "rock") ||
        (humanChoice == "paper" && computerChoice == "scissors")) {
        computerScore.textContent = Number(computerScore.textContent) + 1;
        computerImage.classList.add("winner");
        return { result: `You lose! ${computerChoice} beats ${humanChoice}`, type: "lose" };
    } else {
        return { result: "It's a tie!", type: "tie" };
    }
}

function displayResult(resultObj) {
    resultMessage.textContent = resultObj.result;
    resultMessage.className = `result-message ${resultObj.type}`;
}
function endGame() {
    finalResult.style.display = "block";
    const humanScoreNum = Number(humanScore.textContent);
    const computerScoreNum = Number(computerScore.textContent);
    
    if (humanScoreNum > computerScoreNum) {
        finalResult.innerHTML = "🎉 You Win the Game! 🎉";
        finalResult.style.borderColor = "var(--green)";
    } else if (computerScoreNum > humanScoreNum) {
        finalResult.innerHTML = "💻 Computer Wins! Try Again";
        finalResult.style.borderColor = "var(--red)";
    } else {
        finalResult.innerHTML = "It's a Tie Game! 🤝";
        finalResult.style.borderColor = "var(--yellow)";
    }
    
    scoreboardContainer.style.display = "none";
    userChoice.style.display = "none";
    resultMessage.style.display = "none";
    resetButton.style.display = "block";
}

humanImageChoice.forEach(choice => {
    choice.addEventListener('click', function() {
    if (rounds <= 5) {
        const humanChoice = this.dataset.value;
        const computerChoice = getComputerChoice();
        const resultObj = playRound(humanChoice, computerChoice);
        
        updateImages(humanChoice, computerChoice);
        displayResult(resultObj);
        
        roundNum.textContent = rounds;
        rounds++;
        }
    else{
        endGame()
}
})
})
resetButton.addEventListener("click", function(){
    rounds = 1;
    humanScore.textContent = 0;
    computerScore.textContent = 0;
    roundNum.textContent = 1;
    resultMessage.textContent = "";
    resultMessage.className = "result-message";
    finalResult.innerHTML = "";
    userChoice.style.display = "";
    resultMessage.style.display = "";
    resetButton.style.display = "";
    scoreboardContainer.style.display = "";
    finalResult.style.display="none";
    playerImage.src = imageToImagePath.q;
    computerImage.src = imageToImagePath.q;
    playerImage.classList.remove("winner");
    computerImage.classList.remove("winner");
})
