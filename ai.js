let board_sim = new Array(); //board simulation for AI
let BOARD_SIZE = 9;
let UNOCCUPIED = ' ';
let HUMAN_PLAYER = 'O';
let COMPUTER_PLAYER = 'X';
let active_turn = "HUMAN";
let choice = null;
let searchTimes = new Array();
let showAverageTime = true;

function NewGame() {
    board_sim = []
    for (i = 0; i < BOARD_SIZE; i++) {
        board_sim[i] = UNOCCUPIED;
    }
}


function AI_MasterMove() {
    if (nowinner) {
        minimax(board_sim, 0);
        ind = setTimeout(() => {
            if (player_turn[1].classList.contains(playerTwo_mark)) {
                let move = choice;
                board_sim[move] = COMPUTER_PLAYER;
                choice = [];
                active_turn = "HUMAN";
                //----------------------------imported 
                game_boxes[move].classList.add(playerTwo_mark);
                player_turn.forEach((item) => {
                    item.classList.remove(playerTwo_mark);
                    item.classList.add(playerOne_mark);
                })
                playTwoArray.push(move)
                generalArray.push(move)
                //----------------------------imported
                gameCheckForWinner()
                CheckForWinner(board_sim)
            }
        }, 500)
    }
}

function score(game, depth) {
    let score = CheckForWinner(game);
    if (score === 1)
        return 0;
    else if (score === 2)
        return depth - 10;
    else if (score === 3)
        return 10 - depth;
}


function minimax(tempBoardGame, depth) {
    if (CheckForWinner(tempBoardGame) !== 0)
        return score(tempBoardGame, depth);

    depth += 1;
    let scores = new Array();
    let moves = new Array();
    let availableMoves = GetAvailableMoves(tempBoardGame);
    let move, possible_game;
    for (let i = 0; i < availableMoves.length; i++) {
        move = availableMoves[i];
        possible_game = GetNewState(move, tempBoardGame);
        scores.push(minimax(possible_game, depth));
        moves.push(move);
        tempBoardGame = UndoMove(tempBoardGame, move);
    }

    let max_score, max_score_index, min_score,
        min_score_index;
    if (active_turn === "COMPUTER") {
        max_score = Math.max.apply(Math, scores);
        max_score_index = scores.indexOf(max_score);
        choice = moves[max_score_index];
        return scores[max_score_index];
    } else {
        min_score = Math.min.apply(Math, scores);
        min_score_index = scores.indexOf(min_score);
        choice = moves[min_score_index];
        return scores[min_score_index];
    }
}

function UndoMove(game, move) {
    game[move] = UNOCCUPIED;
    ChangeTurn();
    return game;
}

function GetNewState(move, game) {
    let piece = ChangeTurn();
    game[move] = piece;
    return game;
}

function ChangeTurn() {
    let piece;
    if (active_turn === "COMPUTER") {
        piece = 'X';
        active_turn = "HUMAN";
    } else {
        piece = 'O';
        active_turn = "COMPUTER";
    }
    return piece;
}

function GetAvailableMoves(game) {
    let possibleMoves = new Array();
    for (let i = 0; i < BOARD_SIZE; i++)
        if (game[i] === UNOCCUPIED)
            possibleMoves.push(i);
    return possibleMoves;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if HUMAN_PLAYER won
//   3 if COMPUTER_PLAYER won
function CheckForWinner(game) {
    // Check for horizontal wins
    for (i = 0; i <= 6; i += 3) {
        if (game[i] === HUMAN_PLAYER && game[i + 1] === HUMAN_PLAYER && game[i + 2] === HUMAN_PLAYER)
            return 2;
        if (game[i] === COMPUTER_PLAYER && game[i + 1] === COMPUTER_PLAYER && game[i + 2] === COMPUTER_PLAYER)
            return 3;
    }

    // Check for vertical wins
    for (i = 0; i <= 2; i++) {
        if (game[i] === HUMAN_PLAYER && game[i + 3] === HUMAN_PLAYER && game[i + 6] === HUMAN_PLAYER)
            return 2;
        if (game[i] === COMPUTER_PLAYER && game[i + 3] === COMPUTER_PLAYER && game[i + 6] === COMPUTER_PLAYER)
            return 3;
    }

    // Check for diagonal wins
    if ((game[0] === HUMAN_PLAYER && game[4] === HUMAN_PLAYER && game[8] === HUMAN_PLAYER) ||
        (game[2] === HUMAN_PLAYER && game[4] === HUMAN_PLAYER && game[6] === HUMAN_PLAYER))
        return 2;

    if ((game[0] === COMPUTER_PLAYER && game[4] === COMPUTER_PLAYER && game[8] === COMPUTER_PLAYER) ||
        (game[2] === COMPUTER_PLAYER && game[4] === COMPUTER_PLAYER && game[6] === COMPUTER_PLAYER))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++) {
        if (game[i] !== HUMAN_PLAYER && game[i] !== COMPUTER_PLAYER)
            return 0;
    }
    return 1;
}
