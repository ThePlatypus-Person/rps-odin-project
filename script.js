function translateNumber(num) {
    switch (num) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            throw new RangeError("Number must be 0, 1, or 2.");
    }
}

function getComputerChoice() {
    let num = Math.floor(Math.random() * 3);
    const element = document.querySelector(`.selection .choice [data-key="${num}"]`);
    return element;
}


function setDOM(userChoice, userScore, computerChoice, computerScore, text){
    const playerSide = document.querySelector(".player-side");
    const computerSide = document.querySelector(".computer-side");
    const highlight = document.querySelector(".highlight");

    highlight.innerHTML = `${text}`;

    playerSide.innerHTML = `
        <h3>Player: ${userScore}</h3>
        <img src="${userChoice.getAttribute("src")}">
    `;

    computerSide.innerHTML = `
        <h3>Computer: ${computerScore}</h3>
        <img src="${computerChoice.getAttribute("src")}">
    `;
}


function displayOverlay(text, restartButton) {
    const blur = document.createElement("div");
    blur.classList.add("blur");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const tab = document.createElement("div");
    
    const announce = document.createElement("h3");
    announce.textContent = text;

    tab.appendChild(announce);
    tab.appendChild(restartButton);
    overlay.appendChild(tab);
    const body = document.querySelector("body");

    body.appendChild(blur);
    body.appendChild(overlay);
}

function main() {
    let userScore = 0;
    let computerScore = 0;

    const selections = document.querySelectorAll(".selection > .choice");
    selections.forEach(choice => {
        choice.addEventListener("click", (e) => {
            const userChoice = e.target;
            const computerChoice = getComputerChoice();

            const user = Number(userChoice.dataset.key);
            const comp = Number(computerChoice.dataset.key);
            let text = "";

            if (user === comp) {
                text = `<h3>It's a Draw!</h3>
                    <p>Both chose ${translateNumber(user)}.</p>`;
            } else if ( (user === 0 && comp === 1) ||
                        (user === 1 && comp === 2) ||
                        (user === 2 && comp === 0)) {
                computerScore++;
                text = `<h3>You Lose!</h3>
                    <p>${translateNumber(comp)} beats ${translateNumber(user)}.</p>`;
            } else {
                userScore++;
                text = `<h3>You Win!</h3>
                    <p>${translateNumber(user)} beats ${translateNumber(comp)}.</p>`;
            }

            setDOM(userChoice, userScore, computerChoice, computerScore, text);
            
            if (userScore >= 5 || computerScore >= 5) {
                const annoucement = (userScore > computerScore) ? "You Win!" : "You Lose...";
                const restart = document.createElement("button");
                restart.textContent = "Play Again";

                restart.addEventListener("click", () => {
                    computerScore = 0;
                    userScore = 0;

                    const playerSide = document.querySelector(".player-side");
                    const computerSide = document.querySelector(".computer-side");
                    const highlight = document.querySelector(".highlight");

                    playerSide.innerHTML = "<h3>Player: 0</h3>";
                    computerSide.innerHTML = "<h3>Computer: 0</h3>";
                    highlight.innerHTML = "<h3>First to score 5 points wins!</h3>";

                    const body = document.querySelector("body");
                    body.removeChild(body.lastChild);
                    body.removeChild(body.lastChild);
                });

                displayOverlay(annoucement, restart);
            }


        })
    });
}

main();
