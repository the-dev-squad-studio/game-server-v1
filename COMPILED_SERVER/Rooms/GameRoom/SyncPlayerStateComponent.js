"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncPlayerComponent = void 0;
class SyncPlayerComponent {
    constructor(room, netMessageSystem) {
        netMessageSystem.OnMessage("SYNC", (clientMessage) => {
            //console.log(clientMessage.message);
            room.state.playerStates.set(clientMessage.client.sessionId, clientMessage.message);
        });
    }
}
exports.SyncPlayerComponent = SyncPlayerComponent;
