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
}
exports.LobbyRoomManager = LobbyRoomManager;
LobbyRoomManager.lobbyRooms = new Map();
