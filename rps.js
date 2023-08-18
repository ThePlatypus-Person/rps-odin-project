function getComputerChoice() {
    let num = Math.floor(Math.random() * 3) + 1;

    switch (num) {
    case 1:
        return "rock";
    case 2:
        return "paper";
    case 3:
        return "scissors";
    }
}

function playRound(player, computer) {
    if (player === computer) {
        return ("Draw.");
    }

    if (player === "rock") {
        if (computer === "paper") {
            computerScore++;
            return "You lose! paper beats rock";
        } else {
            playerScore++;
            return "You win! rock beats scissors";
        }
    }

    if (player === "paper") {
        if (computer === "scissors") {
            computerScore++;
            return "You lose! scissors beats paper";
        } else {
            playerScore++;
            return "You win! paper beats rock";
        }
    }

    if (player === "scissors") {
        if (computer === "rock") {
            computerScore++;
            return "You lose! rock beats scissors";
        } else {
            playerScore++;
            return "You win! scissors beats paper";
        }
    }
}

function endGame() {
}

let playerScore = 0;
let computerScore = 0;

const announce = document.querySelector(".announce");
const player = document.querySelector(".score .player");
const computer = document.querySelector(".score .computer");

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let playerSelect = e.target.getAttribute("id");
        let computerSelect = getComputerChoice();

        let round = (playRound(playerSelect, computerSelect));

        announce.textContent = round;
        player.textContent = "Player:\t" + playerScore;
        computer.textContent = "Computer:\t" + computerScore;

        if (playerScore === 5 || computerScore === 5) {
            let winner = (playerScore > computerScore ? "You" : "Computer");
            
            buttons.forEach(btn => { btn.disabled = true });
            let restart = document.createElement("button");
            restart.textContent = "Play Again";
            restart.classList.add("restart");
            restart.addEventListener("click", () => {
                playerScore = 0;
                computerScore = 0;
                player.textContent = computer.textContent = announce.textContent = '';
                buttons.forEach(btn => { btn.disabled = false });

                announce.removeChild(restart);
            });

            announce.textContent = `${winner} won!`;
            announce.appendChild(restart);

        }
    });
});
