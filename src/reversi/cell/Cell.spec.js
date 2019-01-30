import { TYPE_WHITE, TYPE_BLACK, TYPE_EMPTY, create, getTypes, getColor } from './Cell';

describe('Cell', () => {
    it('create should return valid cell', () => {
        expect(create(0, 4, TYPE_WHITE)).toEqual({
            x: 0,
            y: 4,
            type: TYPE_WHITE,
        });
    });

    it('getTypes should return valid cellTypes', () => {
        expect(getTypes()).toEqual([TYPE_EMPTY, TYPE_WHITE, TYPE_BLACK]);
    });

    it('getColor should return valid color for cell type', () => {
        expect(getColor(TYPE_WHITE)).toEqual('#FFFFFF');
        expect(getColor(TYPE_BLACK)).toEqual('#000000');
        expect(getColor(TYPE_EMPTY)).toEqual('#079153');
    });
});
