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

            return statecopy;

        case 'server/CELL_CLICKED':

            gameId = action.gameId;
            const enemyId = Object.keys(statecopy.games[gameId].players).filter((player)=>player!=socketId)[0];

            const enemyBoard = statecopy.games[gameId].players[enemyId].board;



            //enemyBoard.enemyHits
            //enemyBoard.Hits
            //enemyBoard.ships.layout


            break;

        default:
            return makeCopy(state);

    }

}

