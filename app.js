const start_up_screen = document.querySelector(".start-up-screen");
const game_Screen = document.querySelector(".game-screen");
const winning_screen = document.querySelector(".winning-screen");
const mark = document.querySelectorAll(".mark");
const game_squares = document.querySelectorAll(".square");
const game_boxes = document.querySelectorAll(".boxes");
const player_turn = document.querySelectorAll(".turn");
const player_score = document.querySelector("#player-One-score");
const cpu_score = document.querySelector("#cpu-score");
const drawn_score = document.querySelector("#draw-score");
const playsMark = document.querySelectorAll(".detail .mark");




// object declarations
const NewGameCpu_btn = document.querySelector(".btn.cpu");
const NewGamePlayer_btn = document.querySelector(".btn.player");
const winState_quit_btn = document.querySelector(".quit-btn")
const NextRound_btn = document.querySelector(".next-round-btn");

let player_1_win = false
let playerOne_mark = null;
let playerTwo_mark = null;
let playOneArray = [], playTwoArray = [], generalArray = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let drawnScore = 0;
let cpu_player = false;
let ind = null //interval id
let nowinner = true
let currentPlayerMark = null

// ========================== Game Logic =======================
game_squares.forEach((item, idx) => {
    item.addEventListener("click", () => {

        player_one_play(idx);

        if (!cpu_player) {
            player_two_play(idx);
        } else {
            active_turn = COMPUTER_PLAYER;
            gameCheckForWinner()
            CheckForWinner(board_sim)
            ai_playerTwo();
        }

    })
})
// =========================================== functions

function ai_playerTwo() {
    // AI_blindMove()
    AI_MasterMove()
}

function player_one_play(id) {
    if (!game_boxes[id].classList.contains(playerOne_mark)
        && !game_boxes[id].classList.contains(playerTwo_mark)
        && player_turn[0].classList.contains(playerOne_mark)
    ) {
        game_boxes[id].classList.add(playerOne_mark);
        player_turn.forEach((item) => {
            item.classList.remove(playerOne_mark);
            item.classList.add(playerTwo_mark);
        })
        playOneArray.push(id)
        generalArray.push(id)
        if (cpu_player) {
            board_sim[id] = HUMAN_PLAYER;
        }
    }
}

function player_two_play(id) {
    if (!game_boxes[id].classList.contains(playerOne_mark)
        && !game_boxes[id].classList.contains(playerTwo_mark)
        && player_turn[1].classList.contains(playerTwo_mark)
    ) {
        game_boxes[id].classList.add(playerTwo_mark);
        player_turn.forEach((item) => {
            item.classList.remove(playerTwo_mark);
            item.classList.add(playerOne_mark);
        })
        playTwoArray.push(id);
        generalArray.push(id);
        gameCheckForWinner()
    }
}



// ======================== winning state functions ==========================================

// winning game logic
function gameCheckForWinner() {
    const winArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
    nowinner = true

    for (let i = 0; i < winArray.length; i++) {
        const box1 = game_boxes[winArray[i][0]]
        const box2 = game_boxes[winArray[i][1]]
        const box3 = game_boxes[winArray[i][2]]

        if (
            box1.classList.contains(playerOne_mark)
            && box2.classList.contains(playerOne_mark)
            && box3.classList.contains(playerOne_mark)
        ) {
            popup(1);
            nowinner = false;
        }
        if (
            box1.classList.contains(playerTwo_mark)
            && box2.classList.contains(playerTwo_mark)
            && box3.classList.contains(playerTwo_mark)
        ) {
            popup(2);
            nowinner = false
        }
    }
    //check for ties
    if (
        generalArray.length > 8 && nowinner
    ) {
        popup(3);
        nowinner = false
        // NewGame()
    }
    // return 0;
}

function AI_blindMove() {
    let randnum = null
    let run = true
    let count = 2
    if (nowinner && !GameOver(board_sim)) {
        ind = setTimeout(() => {
            if (player_turn[1].classList.contains(playerTwo_mark)) {
                do {
                    randnum = Math.floor(Math.random() * 9)
                    if (
                        !game_boxes[randnum].classList.contains(playerOne_mark)
                        && !game_boxes[randnum].classList.contains(playerTwo_mark)
                    ) {
                        run = false
                        // 
                        game_boxes[randnum].classList.add(playerTwo_mark);
                        player_turn.forEach((item) => {
                            item.classList.remove(playerTwo_mark);
                            item.classList.add(playerOne_mark);
                        })
                        playTwoArray.push(randnum)
                        generalArray.push(randnum)
                        checkForWinner()
                    }
                } while (generalArray.length - 1 <= 8 && run)
            }
        }, 500);
    }
}

function GameOver(game) {
    if (CheckForWinner(game) === 0)
        return false;
    else if (CheckForWinner(game) === 1) {
        // var alert = document.getElementById("turnInfo");
        // alert.innerHTML = "It is a draw.";
    }
    else if (CheckForWinner(game) === 2) {
        // var alert = document.getElementById("turnInfo");
        // alert.innerHTML = "Player have won! Congratulations!";
    }
    else {
        // var alert = document.getElementById("turnInfo");
        // alert.innerHTML = "The computer has won.";
    }
    // ShowAverageTime();
    return true;
}