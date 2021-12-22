"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyDataComponent = void 0;
const LobbyRoom_1 = require("./LobbyRoom");
class LobbyDataComponent {
    constructor(room, netMessageSystem) {
        netMessageSystem.OnMessage("SET_GAME_TIME", (clientMessage) => { room.state.lobbyData.gameTime = clientMessage.message; });
        netMessageSystem.OnMessage("SET_MAX_PLAYER", (clientMessage) => {
            room.state.lobbyData.maxPlayer = clientMessage.message;
            LobbyRoom_1.NewLobbyRoom.UpdateJoinable(room);
        });
        netMessageSystem.OnMessage("SET_IS_PUBLIC", (clientMessage) => {
            room.state.lobbyData.isPublic = clientMessage.message;
            LobbyRoom_1.NewLobbyRoom.UpdateJoinable(room);
        });
    }
}
exports.LobbyDataComponent = LobbyDataComponent;
