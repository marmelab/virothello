export const TYPE_EMPTY = 0;
export const TYPE_BLACK = 1;
export const TYPE_WHITE = 2;

export function create(x, y, type) {
    return {
        x,
        y,
        type,
    };
}

export const hasSamePosition = cell => otherCell => {
    return cell.x === otherCell.x && cell.y === otherCell.y;
};

export function getColor(type) {
    switch (type) {
        case TYPE_BLACK:
            return '#000000';
        case TYPE_WHITE:
            return '#FFFFFF';
        default:
            return '#079153';
    }
}

export function getTypes() {
    return [TYPE_EMPTY, TYPE_WHITE, TYPE_BLACK];
}

export function reverseCellType(cellType) {
    switch (cellType) {
        case TYPE_BLACK:
            return TYPE_WHITE;
        case TYPE_WHITE:
            return TYPE_BLACK;
        case TYPE_EMPTY:
            return TYPE_EMPTY;
        default:
            return null;
    }
}
