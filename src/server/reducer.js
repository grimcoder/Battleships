const makeCopy = require( './tools').makeCopy
const DotInArray = require( './tools').DotInArray
const AllDotIn = require( './tools').AllDotIn

module.exports.reducer =  (state = {}, action) => {

    const statecopy = makeCopy(state);
    const socketId = action.socketId;

    let gameId;
    switch (action.type){

        case 'server/init' :

            return makeCopy(state);

        case 'server/create':

            const newgameId = action.newgameId;

            statecopy.games[newgameId] = {
                status: 'init', // init, created, started, finished
                turn: socketId,
                players: {

                }
            }

            statecopy.games[newgameId].players[socketId] = {}

            statecopy.games[newgameId].createdBy = socketId;

            return statecopy;

            break;

        case 'server/join':


             gameId = action.data;

            if (statecopy.games[gameId].createdBy == socketId) return statecopy;

            statecopy.games[gameId].players[socketId] = {}
            statecopy.games[gameId].status = 'created'
            return statecopy;
            break;

        case 'server/start':
            gameId = action.data.game;
            statecopy.games[gameId].players[socketId].started = true;
            statecopy.games[gameId].players[socketId].board = action.data.board;

            const allShips = []
            //
            action.data.board.ships.layout.map((p)=>{
                p.positions.map((m)=>{
                    allShips.push(m);
                })
            })

            statecopy.games[gameId].players[socketId].board.allShips = allShips;
            return statecopy;

        case 'server/CELL_CLICKED':

        gameId = action.gameId;

            console.log (`action: ${JSON.stringify(action)}`)
            let x,y;
            [x,y] = [action.x, action.y];

            const enemyId = Object.keys(statecopy.games[gameId].players).filter((player)=>player!=socketId)[0];
            const enemyBoard = statecopy.games[gameId].players[enemyId].board;
            const board = statecopy.games[gameId].players[socketId].board;

            if (!enemyBoard.enemyHits.some((hit)=>{hit[0] == x && hit[1] == y})){
                enemyBoard.enemyHits.push([x,y]);
            }

            const status = resolveClass(x,y,enemyBoard);

            board.hits.push({
                x: x,
                y: y,
                status
            })

            statecopy.games[gameId].turn = enemyId;
            console.log(JSON.stringify(statecopy))

            return statecopy;
            break;

        default:
            return makeCopy(state);

    }

}

        resolveClass = (x,y, board) => {

            const hits = board.enemyHits;
            const allShips = board.allShips;
            const ships = board.ships;

            if (DotInArray([x,y],hits) && DotInArray([x,y],allShips)) {

        for (var s = 0 ; s < ships.layout.length; s++){
            var ship = ships.layout[s].positions;
            if (AllDotIn(ship, hits)){
                if (DotInArray([x,y], ship)){
                    return 'killed'
                }
            }
        }

        return 'hit'

    }
    else if (DotInArray([x,y],hits))
        return 'tried'
    else {
        return 'empty'
    }
}
