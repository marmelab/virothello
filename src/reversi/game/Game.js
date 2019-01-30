import {
    create as createBoard,
    getFlippedCellsFromCellChange,
    drawCells,
    getLegalCellChangesForCellType,
    isFull,
    getCellTypeDistribution,
} from '../board/Board';

export function create(players) {
    return {
        board: createBoard(8, 8),
        players,
        playerIndex: 0,
        isFinished: false,
        date: new Date(),
    };
}

export function playCellChange(cellChange, game) {
    const newGame = { ...game };

    const flippedCells = [...getFlippedCellsFromCellChange(cellChange, newGame.board), cellChange];

    newGame.board = drawCells(flippedCells, newGame.board);

    if (isFull(newGame.board)) {
        newGame.isFinished = true;
    }

    return newGame;
}

export function isPvc(game) {
    return game.players.filter(p => !p.isHuman).length > 0;
}

export function tryPlayerSwitch(game) {
    const reversePlayer = getReversePlayer(game);
    if (!game.isFinished && !playerCanPlay(reversePlayer, game)) {
        if (!playerCanPlay(getCurrentPlayer(game), game)) {
            throw new Error('Nobody can play !');
        }
        throw new Error(`${reversePlayer} can't play, play again !`);
    }

    return switchPlayer(game);
}

export function getWinner(game) {
    const cellDistribution = getCellTypeDistribution(game.board);

    const currentPlayer = getCurrentPlayer(game);
    const reversePlayer = getReversePlayer(game);

    if (cellDistribution[currentPlayer.cellType] > cellDistribution[reversePlayer.cellType]) {
        return currentPlayer;
    } else if (
        cellDistribution[currentPlayer.cellType] < cellDistribution[reversePlayer.cellType]
    ) {
        return reversePlayer;
    }

    return null;
}

export function getCurrentPlayer(game) {
    return game.players[game.playerIndex];
}

export function getReversePlayerIndex(game) {
    return game.playerIndex === 0 ? 1 : 0;
}

export function getReversePlayer(game) {
    return game.players[getReversePlayerIndex(game)];
}

export function switchPlayer(game) {
    const newGame = Object.assign({}, game);
    newGame.playerIndex = getReversePlayerIndex(newGame);
    return newGame;
}

export function getCurrentPlayerLegalCellChanges(game) {
    const currentPlayer = getCurrentPlayer(game);
    return getLegalCellChangesForCellType(currentPlayer.cellType, game.board);
}

export function playerCanPlay(player, game) {
    return getLegalCellChangesForCellType(player.cellType, game.board).length > 0;
}

export function getCurrentAvailableCellChanges(game) {
    const currentPlayer = getCurrentPlayer(game);
    return getLegalCellChangesForCellType(currentPlayer.cellType, game.board);
}
