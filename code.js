// Create the object, array of arrays, for the board.
let boardModelStart = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let boardModel = [
    [0, 0, 0, 0, 0, 0], // column 0 (left)
    [0, 0, 0, 0, 0, 0], // column 1
    [0, 0, 0, 0, 0, 0], // column 2
    [0, 0, 0, 0, 0, 0], // column 3
    [0, 0, 0, 0, 0, 0], // column 4
    [0, 0, 0, 0, 0, 0], // column 5
    [0, 0, 0, 0, 0, 0]  // column 6 (right)
]

// Track players turns. Game starts with black, so even = black, and red = odd
let turnTracker = 0;

// FUNCTIONS 
let eventListeners = function() { // Event Listeners for each column
    let col0 = document.getElementById('col0');
    col0.addEventListener('click', function () {
        addNewDisc(boardModel, 0);
        isGameWon(boardModel); // On each turn, checks to see if the game has been won.
    })
    let col1 = document.getElementById('col1');
    col1.addEventListener('click', function () {
        addNewDisc(boardModel, 1);
        isGameWon(boardModel);
    })
    let col2 = document.getElementById('col2');
    col2.addEventListener('click', function () {
        addNewDisc(boardModel, 2);
        isGameWon(boardModel);
    })
    let col3 = document.getElementById('col3');
    col3.addEventListener('click', function () {
        addNewDisc(boardModel, 3);
        isGameWon(boardModel);
    })
    let col4 = document.getElementById('col4');
    col4.addEventListener('click', function () {
        addNewDisc(boardModel, 4);
        isGameWon(boardModel);
    })
    let col5 = document.getElementById('col5');
    col5.addEventListener('click', function () {
        addNewDisc(boardModel, 5);
        isGameWon(boardModel);
    })
    let col6 = document.getElementById('col6');
    col6.addEventListener('click', function () {
        addNewDisc(boardModel, 6);
        isGameWon(boardModel);
    })
    let restartButton = document.getElementById('restart'); //Added the restart button up here to event listeners section. We can delete the function if we want.
    restartButton.addEventListener('click', function() {
        window.location.reload();
    })
}

function renderBoard(boardObj) { //CALEB
    // render the DOM based on the board state
    // loop thru the 2d array
    // if the value is 0, assign empty to span, if 1 = black, if 2 = red.

    let board = document.getElementById('game') // the board frame
    board.innerHTML = '';

    for (let colIndex = 0; colIndex < boardObj.length; colIndex += 1) { // each row in the boardModel is a 'li' with id of the rowIndex
        let col = document.createElement('li');
        col.id = `col${colIndex}`;
        board.append(col);

        let colArray = boardObj[colIndex] // the list of spaces is an array derived from that row's index

        for (let spaceIndex = 0; spaceIndex < colArray.length; spaceIndex += 1) { // loop thru the spaces in the row, create a span
            let space = document.createElement('span');
            let spaceValue = colArray[spaceIndex];

            if (spaceValue === 1) { // assign class 'black' to span
                space.classList.add('black');
            } else if (spaceValue === 2) { // assign class 'red' to span
                space.classList.add('red');
            } else { // assign class 'empty' to span
                space.classList.add('empty');
            }
            // Add another class for each span that labels which column its in: col1, col2, col3, based on the Row index in which it's created
            let spaceRowClass = `row${spaceIndex}`;
            space.classList.add(spaceRowClass);
            col.append(space);
        }
    }
    renderCurrentPlayer(turnTracker)
    eventListeners();
}

function isGameWon(boardObj) { //JORDAN
    // calls the are4xxx() functions to examine the board for 4-in-a-row
    // if any of those return true, call announceWin()
    // if isGameTie === true, call announceTie()
    if (are4Vertical() === true || are4Horizontal() === true || are4DiagonalLeft() === true || are4DiagonalRight() === true) {
        announceWin();
        return true
        // Need to stop players from being able to click on a column and addNewDisc
    } else if (isGameTie(boardObj) === true) {
        announceTie();
    }
}

function isGameTie(boardObj) { //JORDAN 
    // Looks for any 0s in the board. If no 0s, board is filled. 
    for (let column of boardObj) {
        for (let space of column) {
            if (space === 0) { // If there is any empty space, returns false
                return false;
            }
        }
    }
    return true; // if after looping thru the entire 2d array, no 0 found, then board is filled, game is tied
}

function are4Vertical() { //JORDAN
    const edgeY = boardModel.length - 3;
    for (let y = 0; y < edgeY; y++) {
        for (let x = 0; x < boardModel[0].length; x++) {
            let cell = boardModel[y][x];
            if (cell !== 0) { //If cell does not = 0, below will check to see if the values next to that cell is the same. If so, it is a win combo.
                if (cell === boardModel[y + 1][x] && cell === boardModel[y + 2][x] && cell === boardModel[y + 3][x]) {
                    return true;
                }
            }
        }
    }
}

function are4Horizontal() { //JORDAN
    const edgeX = boardModel[0].length - 3;
    for (let y = 0; y < boardModel.length; y++) {
        for (let x = 0; x < edgeX; x++) {
            let cell = boardModel[y][x];
            if (cell !== 0) { //If cell does not = 0, below will check to see if the values next to that cell is the same. If so, it is a win combo.
                if (cell === boardModel[y][x + 1] && cell === boardModel[y][x + 2] && cell === boardModel[y][x + 3]) {
                    return true;
                }
            }
        }
    }
}

function are4DiagonalLeft() { //JORDAN Changed the name slightly, I was getting confused at which direction I was coding..
    const edgeX = boardModel[0].length - 3;
    const edgeY = boardModel.length - 3;
    for (let y = 3; y < boardModel.length; y++) {
        for (let x = 0; x < edgeX; x++) {
            let cell = boardModel[y][x];
            if (cell !== 0) { //If cell does not = 0, below will check to see if the values next to that cell is the same. If so, it is a win combo.
                if (cell === boardModel[y - 1][x + 1] && cell === boardModel[y - 2][x + 2] && cell === boardModel[y - 3][x + 3]) {
                    return true;
                }
            }
        }
    }
}

function are4DiagonalRight() { //JORDAN
    const edgeX = boardModel[0].length - 3;
    const edgeY = boardModel.length - 3;
    for (let y = 0; y < edgeY; y++) {
        for (let x = 0; x < edgeX; x++) {
            let cell = boardModel[y][x];
            if (cell !== 0) { //If cell does not = 0, below will check to see if the values next to that cell is the same. If so, it is a win combo.
                if (cell === boardModel[y + 1][x + 1] && cell === boardModel[y + 2][x + 2] && cell === boardModel[y + 3][x + 3]) {
                    return true;
                }
            }
        }
    }
}

function isColumnFull(columnArray) { //CALEB
    // Should stop user from adding a disc to an already-full column, so that it's still their turn to play.
    // parameter should be an array of 6 values, ex, [0,0,1,2,1,2], derived the vertical column in the boardModel
    if (columnArray.includes(0) === true) { // Is there a 0 ('empty') space in the column?
        return false;
    } else {
        return true;
    }
}

function announceWin() { //NINA
    // log a message to the user who won
    // If turnTracker equals is even then retun black else if Odd then return red.
    let message = document.getElementById('messages');
    let playerName = '';
    if (turnTracker % 2) { //Changed this from 'turnTracker % 2 === 0'. It now displays the correct winner!
        playerName = 'Black';
    } else {
        playerName = 'Red';
    }
    message.innerHTML = `${playerName} Wins!`;
}

function announceTie() { //NINA We need to modify this slightly. When one column is full, displays a tie.
    // log a message to the user tie game
    let message = document.getElementById('messages');
    message.innerHTML = "Tie Game!";
}

function addNewDisc(boardObj, columnIndex) { //NINA 
    // Event Handler / .addEventListener - based on the span clicked, it's column class
    // Based on users click on a column, adds a disc to the lowest available space
    let blackDisc = 1;
    let redDisc = 2;
    let currentDisc = blackDisc;
    let columnArray = boardObj[columnIndex];
    let playerName = identifyPlayer(turnTracker);
    
    if (isColumnFull(columnArray) === true || isGameWon(boardObj) === true) {
        return;
    } else {
        if (playerName === 'Red') {
            currentDisc = redDisc;
        }
        for (let i = 5; i >= 0; i--) {
            let spaceValue = columnArray[i]
            if (columnArray[i] === 0) {
                columnArray[i] = currentDisc;
                turnTracker++;
                renderBoard(boardObj);
                return;
            }
        }
    }
}

function identifyPlayer(turnNumber) { // based on the turnTracker variable, returns name of current player
    let playerName = 'Black';
    if (turnNumber % 2 !== 0) {
        playerName = 'Red';
    }
    return playerName;
}

function renderCurrentPlayer() {
    let playerH2 = document.querySelector('#messages');
    let playerName = identifyPlayer(turnTracker);
    playerH2.innerHTML = `Current Player: ${playerName}`;
}

// Run everything to set up the board
renderBoard(boardModel)