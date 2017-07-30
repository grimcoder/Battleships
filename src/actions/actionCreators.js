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