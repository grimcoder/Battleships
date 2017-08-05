/**
 * Created by taraskovtun on 7/23/17.
 */
// increment
export function click(x, y, gameId) {
    return {
        type: 'server/CELL_CLICKED',
        x,
        y,
        gameId
    }
}

export function resetState(){
    return {
        type: 'resetState'
    }
}

export function SocketIOHandshake() {
    return {
        type: 'server/hello'
    }
}

export function InitGame() {
    return {
        type: 'server/init',
    }
}

export function CreateGame(playerName) {
    return {
        type: 'server/create',
        playerName
    }
}

export function joinGame(game, name) {
    return {
        type: 'server/join',
        data: game,
        name: name
    }
}

export function startGame(game, layout) {
    return {
        type: 'server/start',
        data: {
            game: game,
                board: {
                    ships: {
                        "layout": layout
                    },
                    hits: [],
                    enemyHits: []
                }

        }

    }
}

