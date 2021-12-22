"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncPlayerComponent = void 0;
const GamePlayer_1 = require("../../States/GameRoomState/GamePlayer");
class SyncPlayerComponent {
    constructor(room, netMessageSystem) {
        netMessageSystem.OnMessage("SET_PLAYER_STATE", (clientMessage) => {
            //console.log(clientMessage.message);
            let newState = clientMessage.message;
            let id = newState.id;
            if (room.state.playerStates.has(id)) {
                let playerState = new GamePlayer_1.GamePlayerState();
                Object.assign(playerState, newState);
                room.state.playerStates.set(id, playerState);
            }
        });
    }
}
exports.SyncPlayerComponent = SyncPlayerComponent;
