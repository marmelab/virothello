import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViroAnimations, ViroNode } from 'react-viro';

import Disk from './Disk';
import { isLegalCellChange, getFlippedCellsFromCellChange } from '../reversi/board/Board';

import {
    TYPE_WHITE,
    TYPE_EMPTY,
    hasSamePosition,
    create as createCell,
} from '../reversi/cell/Cell';

class Board extends Component {
    state = {
        flipping: [],
    };

    cellToCellChange = cell => ({
        ...cell,
        type: this.props.currentCellType,
    });

    handleClick = cell => () => {
        const { board } = this.props;

        const cellChange = this.cellToCellChange(cell);
        if (!isLegalCellChange(cellChange, board)) {
            return;
        }

        const flippedCells = getFlippedCellsFromCellChange(cellChange, board);
        this.setState({
            flipping: [...this.state.flipping, ...flippedCells],
        });

        this.props.onCellChange(cellChange);
    };

    handleEndFlip = cell => () => {
        const { flipping } = this.state;

        this.setState({
            flipping: flipping.filter(f => !hasSamePosition(cell)(f)),
        });
    };

    renderCellDisk = cell => {
        const { flipping } = this.state;

        return (
            <Disk
                key={`${cell.x}${cell.y}`}
                position={[0.03 * cell.x, 0, -0.3 - 0.03 * cell.y]}
                rotation={[cell.type === TYPE_WHITE ? 180 : 0, 0, 0]}
                opacity={cell.type === TYPE_EMPTY ? 0.15 : 1}
                onClick={this.handleClick(cell)}
                animation={{
                    name: 'flipDisk',
                    run: !!flipping.find(hasSamePosition(cell)),
                    onFinish: this.handleEndFlip(cell),
                }}
            />
        );
    };

    render() {
        const { board } = this.props;

        return (
            <ViroNode position={[0.0, 0.0, 0.5]}>
                {board.cells
                    .reduce(
                        (agg, row, y) => [...agg, ...row.map((type, x) => createCell(x, y, type))],
                        [],
                    )
                    .map(this.renderCellDisk)}
            </ViroNode>
        );
    }
}

Board.propTypes = {
    onCellChange: PropTypes.func.isRequired,
    currentCellType: PropTypes.number.isRequired,
    board: PropTypes.shape({
        cells: PropTypes.array,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};

ViroAnimations.registerAnimations({
    moveUp: {
        properties: { positionY: '+=0.03' },
        duration: 300,
        easing: 'EaseInEaseOut',
    },
    moveDown: {
        properties: { positionY: '-=0.03' },
        duration: 300,
        easing: 'EaseInEaseOut',
    },
    flip: {
        properties: { rotateX: '+=180' },
        duration: 300,
        easing: 'EaseInEaseOut',
    },
    flipDisk: [['moveUp', 'moveDown'], ['flip']],
});

export default Board;
