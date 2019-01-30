import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import Board from './Board';
import { getCurrentPlayer, tryPlayerSwitch, playCellChange, getWinner } from '../reversi/game/Game';

class Game extends Component {
    state = {
        game: this.props.game,
    };

    handleCellChange = cellChange => {
        const { game } = this.state;

        try {
            const newGame = playCellChange(cellChange, game);

            if (!newGame.isFinished) {
                this.setState({ game: tryPlayerSwitch(newGame) });
            } else {
                Alert.alert(`Well done ${getWinner(newGame).name}! You Win! :)`);
            }
        } catch (e) {
            console.log({ e });
        }
    };

    render() {
        const { game } = this.state;

        return (
            <Board
                board={game.board}
                currentCellType={getCurrentPlayer(game).cellType}
                onCellChange={this.handleCellChange}
            />
        );
    }
}

Game.propTypes = {
    game: PropTypes.shape({}),
};

export default Game;
