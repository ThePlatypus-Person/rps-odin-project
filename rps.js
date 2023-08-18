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

let playerScore = 0;
let computerScore = 0;


function playRound(playerSelection, computerSelection) {
    const player = playerSelection.toLowerCase();
    const computer = computerSelection.toLowerCase();

    if (player === computer) {
        console.log("Draw.");
        return;
    }

    if (player === "rock") {
        if (computer === "paper") {
            console.log("You lose! paper beats rock");
            computerScore++;
        } else {
            console.log("You win! rock beats scissors");
            playerScore++;
        }
    }

    if (player === "paper") {
        if (computer === "scissors") {
            console.log("You lose! scissors beats paper");
            computerScore++;
        } else {
            console.log("You win! paper beats rock");
            playerScore++;
        }
    }

    if (player === "scissors") {
        if (computer === "rock") {
            console.log("You lose! rock beats scissors");
            computerScore++;
        } else {
            console.log("You win! scissors beats paper");
            playerScore++;
        }
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Make your choice: ");
        const computerSelection = getComputerChoice();

        console.log("Player:\t" + playerSelection + "\nComputer: " + computerSelection);
        playRound(playerSelection, computerSelection);
    }

    console.log("Total Score:\nPlayer:\t" + playerScore + "\nComputer: " + computerScore);
}

game();
