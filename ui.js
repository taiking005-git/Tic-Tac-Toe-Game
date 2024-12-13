const playScoreArray1 = []
const playScoreArray2 = []
const circleBorder = document.querySelectorAll(".circle")
const playerDetail = document.querySelectorAll(".game-bottom div")
const boxBorder = document.querySelectorAll(".box")
const undoMove_btn = document.querySelector(".game-retry");

// ================================== Start up screen =============================
NextRound_btn.addEventListener("click", GameNextRound);
winState_quit_btn.addEventListener("click", quitFunction);

NewGamePlayer_btn.addEventListener("click", newGame_vs_Player);
NewGameCpu_btn.addEventListener("click", NewGame_vs_CPU);


// change retry function to undo function
undoMove_btn.addEventListener("click", () => {
    let lastNumber = null;
    let lastClass = null;
    if (generalArray.length > 1) {
        lastNumber = generalArray[generalArray.length - 1]
        lastClass = game_boxes[lastNumber].classList[1]
        game_boxes[lastNumber].classList.remove(lastClass)
        generalArray.pop(lastNumber)
        board_sim[lastNumber] = "";

        // player turn
        if (lastClass === "box") {
            player_turn.forEach((item) => {
                item.classList.remove("circle");
                item.classList.add(lastClass);
            })
        } else if (lastClass === "circle") {
            player_turn.forEach((item) => {
                item.classList.remove("box");
                item.classList.add(lastClass);
            })
        }
        if (cpu_player && playerTwo_mark === lastClass) {
            // nowinner = true
            ai_playerTwo();
        }
    }
})


// ====================================== Selecting Players Mark
mark.forEach((item) => {
    item.addEventListener("click", activeMark)
})

// ========================================= functions
function activeMark() {
    mark.forEach((item) => {
        item.classList.remove("active");
        this.classList.add("active");
    })
    if (mark[0].classList.contains("active")) {
        playerOne_mark = "circle"
        playerTwo_mark = "box"
    }
    else if (mark[1].classList.contains("active")) {
        playerOne_mark = "box"
        playerTwo_mark = "circle"
    }

}

function GameNextRound() {

    if (cpu_player) {
        nowinner = true;
        NewGame()
        ai_playerTwo();
    }
    game_boxes.forEach((item) => {
        item.classList.remove("circle")
        item.classList.remove("box")
    })
    playOneArray = []
    playTwoArray = []
    generalArray = []
    winning_screen.style.display = "none";
    winning_screen.style.zIndex = "-100";

}

function NewGame_vs_CPU() {
    newGame_vs_Player()
    cpu_player = true
}

function newGame_vs_Player() {
    NewGame()
    start_up_screen.style.display = "none";
    game_Screen.style.display = "flex";
    game_Screen.style.opacity = "100";
    game_Screen.style.zIndex = "100";

    if (mark[0].classList.contains("active")) {
        playerOne_mark = "circle"
        playerTwo_mark = "box"
    }
    else if (mark[1].classList.contains("active")) {
        playerOne_mark = "box"
        playerTwo_mark = "circle"

    }

    playsMark[0].classList.add(playerOne_mark)
    playsMark[1].classList.add(playerTwo_mark)

    player_turn.forEach((item) => {
        item.classList.add(playerOne_mark);
    })
    player_score.textContent = 0;
    cpu_score.textContent = 0;
    drawn_score.textContent = 0;
    clearBox();
}

function popup(winner) {
    const pop_winner = document.querySelector(".winner");
    const content_winner = document.querySelector(".content-container");
    content_winner.style.display = "none"
    winning_screen.style.display = "flex";
    winning_screen.style.zIndex = "100";
    // winning_screen.style.transition = "all .30s ease-in-out";
    // NewGame()

    if (winner === 1) {
        generalArray = []
        playerOneScore++;
        player_score.textContent = playerOneScore;
        player_turn.forEach((item) => {
            item.classList.remove(playerOne_mark);
            item.classList.add(playerTwo_mark);
        })
        clearInterval(ind)
        pop_winner.textContent = "Player 1 Wins!!";
    } else
        if (winner === 2) {
            generalArray = []
            // player2 = false
            playerTwoScore++;
            cpu_score.textContent = playerTwoScore;
            player_turn.forEach((item) => {
                item.classList.remove(playerTwo_mark);
                item.classList.add(playerOne_mark);
            })
            // NewGame()
            pop_winner.textContent = "Player 2 Wins!!";
        } else
            if (winner === 3) {
                pop_winner.textContent = "Draw!!";
                generalArray = []
                drawnScore++;
                drawn_score.textContent = drawnScore;
                // NewGame()
            }

    setInterval(() => {
        content_winner.style.display = "flex"
    }, 500)

}
function quitFunction() {
    winning_screen.style.display = "none";
    winning_screen.style.zIndex = "-100";
    game_Screen.style.display = "none";
    game_Screen.style.zIndex = "-100";
    start_up_screen.style.display = "flex";
    start_up_screen.style.zIndex = "100";
    clearBox();
    player_turn.forEach((item) => {
        item.classList.remove(playerOne_mark);
        item.classList.remove(playerTwo_mark);
    })
    playsMark.forEach((item) => {
        item.classList.remove(playerOne_mark)
        item.classList.remove(playerTwo_mark)
    })
    cpu_player = false;
}

function clearBox() {
    game_boxes.forEach((item) => {
        item.classList.remove("circle")
        item.classList.remove("box")
    })
    playOneArray = []
    playTwoArray = []
    generalArray = []
    playerOneScore = 0
    playerTwoScore = 0
    drawnScore = 0
    nowinner = false
}

