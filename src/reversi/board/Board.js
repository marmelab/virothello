import { create as createMatrix } from '../matrix/Matrix';

import {
    TYPE_BLACK,
    TYPE_EMPTY,
    TYPE_WHITE,
    create as createCell,
    reverseCellType,
    getTypes as getCellTypes,
} from '../cell/Cell';

import { addGenerator, create as createVector, getDirectionnalVectors } from '../vector/Vector';

export function create(width = 8, height = 8) {
    const board = {
        width,
        height,
        cells: createMatrix(width, height, TYPE_EMPTY),
    };
    validateSize(board);
    return drawCells(getDepartureCells(board), board);
}

export function getDepartureCells(board) {
    const xMiddle = board.width / 2;
    const yMiddle = board.height / 2;
    return [
        createCell(xMiddle, yMiddle, TYPE_BLACK),
        createCell(xMiddle - 1, yMiddle - 1, TYPE_BLACK),
        createCell(xMiddle - 1, yMiddle, TYPE_WHITE),
        createCell(xMiddle, yMiddle - 1, TYPE_WHITE),
    ];
}

export function drawCells(cells, board) {
    const newBoard = { ...board };
    cells.forEach(cell => {
        newBoard.cells[cell.y][cell.x] = cell.type;
    });
    return newBoard;
}

export function getCellTypeDistribution(board) {
    return getCellTypes().reduce(
        (result, cellType) => ({
            ...result,
            [cellType]: board.cells.reduce(
                (total, row) => total + row.filter(cellValue => cellValue === cellType).length,
                0,
            ),
        }),
        {},
    );
}

export function isFull(board) {
    return getCellTypeDistribution(board)[TYPE_EMPTY] === 0;
}

export function validateSize(board) {
    if (board.width % 2 !== 0 || board.height % 2 !== 0) {
        throw new Error('Board size must be even.');
    }
    if (board.width < 4 || board.height < 4) {
        throw new Error('Board size must greater than 4.');
    }
}

export function getFlippedCellsFromCellChange(cellChange, board) {
    if (
        cellChange.y < 0 ||
        cellChange.y >= board.height ||
        board.cells[cellChange.y][cellChange.x] !== TYPE_EMPTY
    ) {
        return [];
    }

    return getDirectionnalVectors().reduce((res, vector) => {
        const directionFlippedCells = getFlippedCellFromCellChangeInDirection(
            cellChange,
            board,
            vector,
        );
        return [...res, ...directionFlippedCells];
    }, []);
}

export function getFlippedCellFromCellChangeInDirection(cellChange, board, directionVector) {
    const flippedCells = [];
    const reverseType = reverseCellType(cellChange.type);
    let position = createVector(cellChange.x, cellChange.y);
    const directionPositions = addGenerator(position, directionVector);

    for (position of directionPositions) {
        if (
            position.y < 0 ||
            position.y >= board.height ||
            board.cells[position.y][position.x] !== reverseType
        ) {
            break;
        }
        flippedCells.push(createCell(position.x, position.y, cellChange.type));
    }

    // Is last position valid ?

    if (
        position.y < 0 ||
        position.y >= board.height ||
        board.cells[position.y][position.x] !== cellChange.type
    ) {
        return [];
    }

    return flippedCells;
}

export function isLegalCellChange(cellChange, board) {
    if (
        cellChange.y < 0 ||
        cellChange.y >= board.height ||
        board.cells[cellChange.y][cellChange.x] !== TYPE_EMPTY
    ) {
        return false;
    }

    return getDirectionnalVectors().some(
        vector => getFlippedCellFromCellChangeInDirection(cellChange, board, vector).length > 0,
    );
}

export function getLegalCellChangesForCellType(cellType, board) {
    return board.cells.reduce(
        (result, row, rowIdx) => [
            ...result,
            ...row
                .map((cellValue, cellIdx) => createCell(cellIdx, rowIdx, cellType))
                .filter(cellChange => isLegalCellChange(cellChange, board)),
        ],
        [],
    );
}

export function getFlattenCells(board) {
    return board.cells.reduce(
        (cells, cellRow, rowIdx) => [
            ...cells,
            ...cellRow.map((cellType, colIdx) => createCell(colIdx, rowIdx, cellType)),
        ],
        [],
    );
}
