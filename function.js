let winners = new Array();
let player1Selections = new Array();
let player2Selections = new Array();
let timer;
let numberOfPlayers = 2;
let currentPlayer = 0;
let move = 0;
let points1 = 0; // player 1 points
let points2 = 0; // player 2 points
let size = 3;

function drawBoard() {
    let Parent = document.getElementById("game");
    let counter = 1;

    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < 6; s++) {
        let row = document.createElement("tr");

        for (r = 0; r < 7; r++) {
            let col = document.createElement("td");
            col.id = counter;
            let img = document.createElement("span");

            let handler = function(e) {
                if (currentPlayer == 0) {
                    img.className = "black-dot"
                        // img.src = "https://img.pngio.com/dot-png-images-free-download-black-dot-png-3500_3500.png"
                        // img.width = "50"
                        // img.height = "50";
                    this.appendChild(img)
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                    d('player1').classList.remove('selected');
                    d('player2').classList.add('selected');
                } else {
                    img.className = "red-dot"
                        // let img = document.createElement("img");
                        // img.src = "https://www.stickpng.com/assets/images/58afdad6829958a978a4a693.png"
                        // img.width = "20"
                        // img.height = "20";
                    this.appendChild(img)
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                    d('player1').classList.add('selected');
                    d('player2').classList.remove('selected');
                }

                if (checkWinner()) {
                    if (currentPlayer == 0) {
                        points1++;
                        alert('Player 1 wins!');
                    } else {
                        points2++;
                        alert('Player 2 wins!');
                    }

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;
                    reset();
                    drawBoard();
                } else if (player2Selections.length + player1Selections.length == 42) {
                    reset();
                    drawBoard();
                } else {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }
        Parent.appendChild(row);
    }

    loadAnswers();
}

function d(id) {
    let el = document.getElementById(id);
    return el;
}

function reset() {
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    d('player1').classList.add('selected');
    d('player2').classList.remove('selected');
}

function loadAnswers() {
    winners.push([1, 2, 3, 4]);
    winners.push([2, 3, 4, 5]);
    winners.push([3, 4, 5, 6]);
    winners.push([4, 5, 6, 7]);

    winners.push([22, 23, 24, 25]);
    winners.push([22, 16, 10, 4]);
    winners.push([22, 15, 8, 1]);

    winners.push([23, 24, 25, 26]);
    winners.push([23, 17, 11, 5]);
    winners.push([23, 16, 9, 2]);

    winners.push([24, 25, 26, 27]);
    winners.push([24, 17, 10, 3]);

    winners.push([25, 26, 27, 28]);
    winners.push([25, 18, 11, 4]);

    winners.push([26, 19, 12, 5]);
    winners.push([26, 18, 10, 2]);

    winners.push([27, 20, 13, 6]);
    winners.push([27, 19, 11, 3]);

    winners.push([28, 21, 14, 7]);
    winners.push([28, 20, 12, 4]);

    winners.push([29, 30, 31, 32]);
    winners.push([29, 22, 15, 8]);
    winners.push([29, 23, 17, 11]);

    winners.push([30, 31, 32, 33]);
    winners.push([30, 23, 16, 9]);
    winners.push([30, 24, 18, 12]);

    winners.push([31, 32, 33, 34]);
    winners.push([31, 24, 17, 10]);
    winners.push([31, 25, 19, 13]);

    winners.push([32, 33, 34, 35]);
    winners.push([32, 25, 18, 11]);
    winners.push([32, 24, 16, 8]);

    winners.push([33, 26, 19, 12]);
    winners.push([33, 25, 17, 9]);

    winners.push([34, 27, 20, 13]);
    winners.push([34, 26, 18, 10]);

    winners.push([35, 28, 21, 14]);
    winners.push([35, 27, 19, 11]);

    winners.push([36, 37, 38, 39]);
    winners.push([37, 38, 39, 40]);
    winners.push([38, 39, 40, 41]);

    winners.push([39, 40, 41, 42]);
    winners.push([39, 40, 41, 42]);

    winners.push([36, 29, 22, 15]);
    winners.push([36, 30, 24, 18]);

    winners.push([37, 30, 23, 16]);
    winners.push([37, 31, 25, 19]);

    winners.push([38, 31, 24, 17]);
    winners.push([38, 32, 26, 20]);

    winners.push([39, 32, 25, 18]);
    winners.push([39, 33, 27, 21]);

    winners.push([40, 33, 26, 19]);
    winners.push([40, 32, 24, 16]);

    winners.push([41, 34, 27, 20]);
    winners.push([41, 33, 25, 17]);

    winners.push([42, 35, 28, 21]);
    winners.push([42, 34, 26, 18]);

}

function checkWinner() {
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    let win = false;
    let playerSelections = new Array();

    if (currentPlayer == 0) {
        playerSelections = player1Selections;
    } else {
        playerSelections = player2Selections;
    }

    if (playerSelections.length >= size) {
        // check if any 'winners' are also in your selections

        for (i = 0; i < winners.length; i++) {
            let sets = winners[i]; // winning hand
            let setFound = true;

            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                let found = false;

                // players hand
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
}

window.addEventListener('load', drawBoard);