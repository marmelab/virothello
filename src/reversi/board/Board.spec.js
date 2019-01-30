import {
    create,
    getDepartureCells,
    drawCells,
    getCellTypeDistribution,
    getFlippedCellFromCellChangeInDirection,
    getFlippedCellsFromCellChange,
    getLegalCellChangesForCellType,
    isLegalCellChange,
} from './Board';

import { TYPE_EMPTY, TYPE_BLACK, TYPE_WHITE, create as createCell } from '../cell/Cell';
import { create as createVector } from '../vector/Vector';

describe('Board', () => {
    it('create should return valid board', () => {
        const expectedBoard = {
            width: 4,
            height: 4,
            cells: [
                [TYPE_EMPTY, TYPE_EMPTY, TYPE_EMPTY, TYPE_EMPTY],
                [TYPE_EMPTY, TYPE_BLACK, TYPE_WHITE, TYPE_EMPTY],
                [TYPE_EMPTY, TYPE_WHITE, TYPE_BLACK, TYPE_EMPTY],
                [TYPE_EMPTY, TYPE_EMPTY, TYPE_EMPTY, TYPE_EMPTY],
            ],
        };

        expect(create(4, 4)).toEqual(expectedBoard);
    });

    it('getDepartureCells should return valid departure cells', () => {
        const expectedCells = [
            createCell(2, 2, TYPE_BLACK),
            createCell(1, 1, TYPE_BLACK),
            createCell(1, 2, TYPE_WHITE),
            createCell(2, 1, TYPE_WHITE),
        ];
        expect(getDepartureCells(create(4, 4))).toEqual(expectedCells);
    });

    it('drawCells should return a new board with new cells drawed', () => {
        const board = create(4, 4);

        const expectedBoard = create(4, 4);
        expectedBoard.cells[1][3] = TYPE_BLACK;

        expect(drawCells([createCell(3, 1, TYPE_BLACK)], board)).toEqual(expectedBoard);
    });

    it('getCellTypeDistribution should return board cell types distribution', () => {
        const board = create(4, 4);
        expect(getCellTypeDistribution(board)).toEqual({
            [TYPE_WHITE]: 2,
            [TYPE_BLACK]: 2,
            [TYPE_EMPTY]: 12,
        });
    });

    it('validateSize should throw an Error on invalid board size', () => {
        const oddBoardSizeCreation = function() {
            create(8, 9);
        };

        const smallBoardSizeCreation = function() {
            create(2, 4);
        };

        expect(oddBoardSizeCreation).toThrow(Error);
        expect(smallBoardSizeCreation).toThrow(Error);
    });

    it('getFlippedCellFromCellChangeInDirection should return flipped Cell from cell change in direction', () => {
        const board = create(8, 8);

        expect(
            getFlippedCellFromCellChangeInDirection(
                createCell(2, 4, TYPE_WHITE),
                board,
                createVector(1, 0),
            ),
        ).toEqual([]);
        expect(
            getFlippedCellFromCellChangeInDirection(
                createCell(2, 3, TYPE_WHITE),
                board,
                createVector(1, 0),
            ),
        ).toEqual([createCell(3, 3, TYPE_WHITE)]);
        expect(
            getFlippedCellFromCellChangeInDirection(
                createCell(2, 4, TYPE_WHITE),
                board,
                createVector(-1, -1),
            ),
        ).toEqual([]);
        expect(
            getFlippedCellFromCellChangeInDirection(
                createCell(7, 7, TYPE_BLACK),
                board,
                createVector(-1, 1),
            ),
        ).toEqual([]);
        expect(
            getFlippedCellFromCellChangeInDirection(
                createCell(3, 5, TYPE_BLACK),
                board,
                createVector(0, -1),
            ),
        ).toEqual([createCell(3, 4, TYPE_BLACK)]);

        board.cells[3][2] = TYPE_BLACK;

        expect(
            getFlippedCellFromCellChangeInDirection(
                createCell(1, 3, TYPE_WHITE),
                board,
                createVector(1, 0),
            ),
        ).toEqual([createCell(2, 3, TYPE_WHITE), createCell(3, 3, TYPE_WHITE)]);
    });

    it('getFlippedCellFromCellChangeInDirection should return flipped Cell from cell change in direction', () => {
        const board = create(8, 8);
        expect(getFlippedCellsFromCellChange(createCell(2, 3, TYPE_WHITE), board)).toEqual([
            createCell(3, 3, TYPE_WHITE),
        ]);
    });

    it('getLegalCellChangesForCellType should return legal cel changes for cell type', () => {
        const board = create(8, 8);

        expect(getLegalCellChangesForCellType(TYPE_WHITE, board)).toEqual([
            createCell(3, 2, TYPE_WHITE),
            createCell(2, 3, TYPE_WHITE),
            createCell(5, 4, TYPE_WHITE),
            createCell(4, 5, TYPE_WHITE),
        ]);
    });

    it('isLegalCellChange should return false for illegal cellChange', () => {
        const board = create(8, 8);
        expect(isLegalCellChange(createCell(0, 0, TYPE_WHITE), board)).toEqual(false);
        expect(isLegalCellChange(createCell(2, 3, TYPE_BLACK), board)).toEqual(false);
    });

    it('isLegalCellChange should return true for legal cellChange', () => {
        const board = create(8, 8);
        expect(isLegalCellChange(createCell(2, 3, TYPE_WHITE), board)).toEqual(true);
    });
});
