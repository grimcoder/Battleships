/**
 * Created by taraskovtun on 7/23/17.
 */
// increment
export function click(x,y) {
    return {
        type: 'CELL_CLICKED',
        x,
        y
    }
}


export function SocketIOHandshake(message) {
    return {
        type: 'server/hello',
        message
    }
}

export function InitGame() {
    return {
        type: 'server/init',

    }
}

export function CreateGame() {
    return {
        type: 'server/create',
    }
}


export function joinGame(game) {
    return {
        type: 'server/join',
        data: game

    }
}

