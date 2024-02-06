'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function findSpecificSlot() {
    const emptySlots = findEmptySlots(gBoard)
    const randIdx = getRandomIntInclusive(0, emptySlots.length)
    return emptySlots[randIdx]
}

function findEmptySlots(board) {
    var emptySlots = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell === WALL ||
                currCell === CHERRY ||
                currCell === GHOST ||
                currCell === PACMAN ||
                currCell === SUPER_FOOD) {
                continue
            } else {
                emptySlots.push({ i, j })
            }
        }
    }
    return emptySlots
}