'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === SUPER_FOOD) activateSuperMode()
    
    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            restartGame()
            return
        } else {
            removeGhost(nextLocation)
        }

    }
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
    }

    if (nextCell === CHERRY) updateScore(10)

    if (!gGame.foodCount) announceWinner()


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

}


function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function activateSuperMode() {
    gPacman.isSuper = true

    for (var i = 0; i < 3; i++) {
        gGhosts[i].color = '#00FF00'
    }

    setTimeout(() => {
        gPacman.isSuper = false
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()
        }
        resetGhost()
       
    }, 5000)
}

function removeGhost(ghostlocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === ghostlocation.i &&
            gGhosts[i].location.j === ghostlocation.j) {
            var removedGhost = gGhosts.splice(i, 1)
            gRemovedGhosts.push(removedGhost[0])
        }
    }
}

function resetGhost() {
    gGhosts.push(...gRemovedGhosts)
    gRemovedGhosts = []
}
