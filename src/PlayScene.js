import React, { Component } from 'react';

import {
    ViroARScene,
    ViroAmbientLight,
    ViroARTrackingTargets,
    ViroARImageMarker,
} from 'react-viro';

import Game from './components/Game';
import { create as createGame } from './reversi/game/Game';
import { create as createPlayer } from './reversi/player/Player';
import { TYPE_BLACK, TYPE_WHITE } from './reversi/cell/Cell';

class PlayScene extends Component {
    state = {
        game: createGame([createPlayer('John', TYPE_BLACK), createPlayer('Charly', TYPE_WHITE)]),
    };

    render() {
        return (
            <ViroARScene>
                <ViroAmbientLight color="#fff" />
                <ViroARImageMarker target={'anchor'}>
                    <Game game={this.state.game} />
                </ViroARImageMarker>
            </ViroARScene>
        );
    }
}

ViroARTrackingTargets.createTargets({
    anchor: {
        source: require('./assets/target.jpg'),
        orientation: 'Up',
        physicalWidth: 0.1,
    },
});

export default PlayScene;
