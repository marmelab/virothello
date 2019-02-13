import { create } from './Game';
import { create as createBoard } from '../board/Board';
import { create as createPlayer } from '../player/Player';
import { TYPE_WHITE, TYPE_BLACK } from '../cell/Cell';

describe('Game', () => {
    it('create should return valid game', () => {
        const players = [createPlayer('john', TYPE_WHITE), createPlayer('doe', TYPE_BLACK)];

        const expectedGame = {
            board: createBoard(8, 8),
            players,
            playerIndex: 0,
            isFinished: false,
        };

        expect(create(players)).toMatchObject(expectedGame);
    });
});
