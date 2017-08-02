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

export function joinGame(game) {
    return {
        type: 'server/join',
        data: game
    }
}

export function startGame(game) {
    return {
        type: 'server/start',
        data: {
            game: game,
                board: {
                    ships: {
                        "layout": [

                            {"ship": "carrier", "positions": [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]]},
                            {"ship": "battleship", "positions": [[5, 2], [5, 3], [5, 4], [5, 5]]},
                            {"ship": "cruiser", "positions": [[8, 1], [8, 2], [8, 3]]},
                            {"ship": "submarine", "positions": [[3, 0], [3, 1], [3, 2]]},
                            {"ship": "destroyer", "positions": [[0, 0], [1, 0]]}
                        ]
                    },
                    hits: [],
                    enemyHits: []
                }

        }

    }
}

