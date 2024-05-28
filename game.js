function gameboard() {
        let filled = 0;
        let board = [];
        let won = false;


        const getFilled = () => filled;
        const getWon = () => won;
        
        const init = () => {
                
                for (let i = 0; i < 3; i++) {
                        let boardRow = []
                        for (let i = 0; i < 3; i++) {
                                boardRow.push(0);
                        }
                        board.push(boardRow);
                }
        };

        const checkHorizontal = (function() {

                function xCondition(token) {
                        return token == 1;
                }

                function oCondition(token) {
                        return token == 2;
                }

                function checkXWin(row) {
                        console.log(board.filter(xCondition));
                        return board[row].filter(xCondition).length == 3;
                }

                function checkOWin(row) {
                        return board[row].filter(oCondition).length == 3;
                }

                return {checkOWin,checkXWin}
        })();

        const checkVertical = (function() {
                function checkXWin(col) {
                        let win = true
                        for (let i = 0;i < 3;i++) {
                                if (board[i][col] != 1) {
                                        win = false;
                                }
                        }
                        return win
                }

                function checkOWin(col) {
                        let win = true;
                        for (let i = 0;i < 3;i++) {
                                if (board[i][col] != 2) {
                                        win = false;
                                }
                        }
                        return win
                }

                return {checkXWin,checkOWin};
        })();

        const checkDiagonal = (function () {

                function checkXwin(row,col) {
                        if (row == col) {
                                let win = true;
                                for (let i = 0; i < 3; i++) {
                                        if (board[i][i] != 1) {
                                                win = false;
                                        }
                                }
                                return win;
                        } else {
                                return;
                        }
                }

                function checkOwin(row,col) {
                        if (row == col) {
                                let win = true;
                                for (let i = 0; i < 3; i++) {
                                        if (board[i][i] != 2) {
                                                win = false;
                                        }
                                }
                                return win;
                        } else {
                                return;
                        }
                }

                return {checkXwin,checkOwin}
        })();

        const checkReverseDiagonal = (function () {

                function checkXwin(row,col) {

                        let win = true;
                        for (let i = 0; i < 3; i++) {
                                if (board[0 + i][2 - i] != 1) {
                                        win = false;
                                }
                        }
                        return win;

                        
                }

                function checkOwin(row,col) {
                        
                        let win = true;
                        for (let i = 0; i < 3; i++) {
                                if (board[0 + i][2 - i] != 2) {
                                        win = false;
                                }
                        }
                        return win;
                       
                }

                return {checkXwin,checkOwin}
        })();

        const Xwin = (row,col) => {
                if (checkHorizontal.checkXWin(row) || checkVertical.checkXWin(col) || checkDiagonal.checkXwin(row, col) || checkReverseDiagonal.checkXwin(row, col)) {
                        console.log("X wins");
                        won = true;
                        return true;
                } else {
                        false;
                }
        }

        const Owin = (row,col) => {
                if (checkHorizontal.checkOWin(row) || checkVertical.checkOWin(col) || checkDiagonal.checkOwin(row, col) || checkReverseDiagonal.checkOwin(row, col)) {
                        console.log("O wins");
                        won = true;
                        return true;
                } else {
                        return false;
                }
        }

        const addX = (row,col) => {
                if (board[row][col] == 0) {
                        board[row][col] = 1;
                        filled += 1;
                }
        };

        const addO = (row,col) => {
                if (board[row][col] == 0) {
                        board[row][col] = 2;
                        filled += 1;
                }
        };

        const cellNotOccupied= (row,col) => {
                
                if (board[row][col] == 0) {
                        console.log("true");
                        return true;
                } else {
                        console.log("false");
                        return false;
                }
        }

        const printBoard = () => {
                for (let i = 0;i < board.length; i++) {
                        console.log(board[i]);
                }
        };

        const resetBoard = () => {
                board = [];
                init();
        }

        return {init,printBoard,addO,addX,getFilled,getWon,Xwin,Owin,resetBoard,cellNotOccupied};
}

function gameController() {
        const board = gameboard();
        board.init();
        board.printBoard();
        const convert = convertId();
        const playerOneName = "player 1";
        const playerTwoName = "player 2";
        const playerIndicator = document.querySelector(".player-indicator");
        const reset = document.querySelector(".reset");
        const winDialog = document.querySelector("dialog");
        const newGamePopUpButton = document.querySelector(".new-game-popup");
        const newGameMainButton = document.querySelector(".new-game");
        const playerNames = document.querySelectorAll(".player-name");


        players = [{
                name: "Player 1",
                token: "X",
        },
        {
                name: "Player 2",
                token: "Y",
        }
        ]

        let activePlayer = players[0];

        const switchPlayer = () => {
                activePlayer = activePlayer === players[0] ? players[1]:players[0];
                playerIndicator.textContent = getActivePlayer().name + "\'s turn";
        };

        const getActivePlayer = () => activePlayer;
        playerIndicator.textContent = getActivePlayer().name + "\'s turn";

        playerNames.forEach((playerName) => {
                playerName.addEventListener("input",() => {
                        console.log(playerName.classList.contains("player-one"));
                        if (playerName.classList.contains("player-one")) {
                                players[0].name = playerName.textContent;
                                if (getActivePlayer() == players[0]) {
                                        playerIndicator.textContent = getActivePlayer().name + "\'s turn";
                                }
                        } else {
                                players[1].name = playerName.textContent;
                                if (getActivePlayer() == players[1]) {
                                        playerIndicator.textContent = getActivePlayer().name + "\'s turn";
                                }
                        }
                        
                })
        })

        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
                box.addEventListener("click",() => {
                        const id = parseInt(box.id);
                        console.log(id);
                        const row = convert.row(id);
                        const col = convert.column(id);
                        if (getActivePlayer().name == players[0].name) {
                                if (board.cellNotOccupied(row,col)) {
                                        board.addX(row, col);
                                        box.textContent = "X";
                                        if (board.Xwin(row, col)) {
                                                console.log("X wins");
                                                prepareDialog(getActivePlayer().name);
                                                winDialog.showModal();
                                                
                                        }
                                } 
                        } else {
                                
                                if (board.cellNotOccupied(row,col)) {
                                        board.addO(row,col);
                                        box.textContent = "O";
                                        if (board.Owin(row, col)) {
                                                console.log("O wins");
                                                prepareDialog(getActivePlayer().name);
                                                winDialog.showModal();
                                        }
                                }
                        }

                        switchPlayer();
                        console.log(board.printBoard());
        
                })
        })

        newGamePopUpButton.addEventListener("click",() => {
                winDialog.close();
                resetGame(board,boxes);
        })

        newGameMainButton.addEventListener("click",() => {
                resetGame(board,boxes);
        })


}

function resetGrid(boxes) {
        boxes.forEach((box) => {
                box.textContent = "";
        })
}

function resetGame(board,boxes) {
        board.resetBoard();
        resetGrid(boxes);
}

function convertId() {
        row = (id) => {
                if (id <= 2) {
                        return 0;
                }
                else if (id > 2 && id <= 5) {
                        return 1;
                }
                else {
                        return 2;
                }
        }

        column = (id) => {
                i = 3
                if (id == 0 || id == 0 + i || id == 0 + 2*i) {
                        return 0;
                }
                else if (id == 1 || id == 1 + i || id == 1 + 2*i) {
                        return 1;
                }
                else {
                        return 2;
                }
        }

        return {row,column};
}

function prepareDialog(playerName) {
        const status = document.querySelector(".status");
        status.textContent = playerName + " Won";
}

gameController();


