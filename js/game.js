'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '✨'
const CHERRY = '🍒'
var gCherryIntervalId

// Model
const gGame = {
    score: 0,
    isOn: false, 
    foodCount: 60
}
var gBoard

function onInit() {
    resetGame()
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    addCherry()


    // moveGhosts()
}

function resetGame() {
    resetModals()
    updateScore(0)
}

function resetModals() {
    const elBtn = document.querySelector('.restart-btn')
    elBtn.classList.add('hide')
    const elModal = document.querySelector('.win-modal')
    elModal.classList.add('hide')
    const elBoard = document.querySelector('.board-container')
    elBoard.classList.remove('hide')
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 1 && j === 1) board[i][j] = SUPER_FOOD
            if (i === 1 && j === 8) board[i][j] = SUPER_FOOD
            if (i === 8 && j === 8) board[i][j] = SUPER_FOOD
            if (i === 8 && j === 1) board[i][j] = SUPER_FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalId)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
}

function restartGame() {
    const elBtn = document.querySelector('.restart-btn')
        elBtn.classList.remove('hide')

}

function announceWinner() {
    const elBoard = document.querySelector('.board-container')
    elBoard.classList.add('hide')
    const elModal = document.querySelector('.win-modal')
    elModal.classList.remove('hide')
}

function addCherry() {
    var cherryPos
    setInterval(()=> {
        cherryPos = findSpecificSlot()
        gBoard[cherryPos.i][cherryPos.j] = CHERRY
        renderCell(cherryPos, CHERRY)
    }, 15000)
}