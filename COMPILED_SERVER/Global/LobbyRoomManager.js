"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRoomManager = void 0;
class LobbyRoomManager {
    static AddRoom(room) {
        this.lobbyRooms.set(room.roomId, room);
    }
    static RemoveRoom(room) {
        if (this.lobbyRooms.has(room.roomId))
            this.lobbyRooms.delete(room.roomId);
    }
    static GetJoinableLobbyRoomID() {
        let id = "";
        this.lobbyRooms.forEach((value, key) => {
            if (id != "")
                return;
            if (value.state.lobbyData.joinable)
                id = key;
        });
        return id;
    }
    static GetRoomList() {
        let ids = [];
        this.lobbyRooms.forEach((value, key) => {
            if (ids.length > 20)
                return;
            if (value.state.lobbyData.joinable)
                ids.push({
                    roomName: value.state.lobbyData.hostName,
                    roomID: key,
                    mapIndex: 0,
                    currentPlayerCount: value.state.players.size,
                    maxPlayerCount: value.state.lobbyData.maxPlayer,
                    gameTime: value.state.lobbyData.gameTime
                });
        });
        let result = "";
        for (let i in ids) {
            result += JSON.stringify(ids[i]) + ";";
        }
        return result;
    }
}
exports.LobbyRoomManager = LobbyRoomManager;
LobbyRoomManager.lobbyRooms = new Map();
