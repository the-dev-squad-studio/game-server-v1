"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewLobbyRoom = void 0;
const colyseus_1 = require("colyseus");
const LobbyPlayer_1 = require("../../States/LobbyRoomState/LobbyPlayer");
const LobbyRoomState_1 = require("../../States/LobbyRoomState/LobbyRoomState");
const NETMessageSystem_1 = require("../../Global/NETMessageSystem");
const LobbyDataComponent_1 = require("./LobbyDataComponent");
const LobbyRoomManager_1 = require("../../Global/LobbyRoomManager");
const StartGameComponent_1 = require("./StartGameComponent");
class NewLobbyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setPatchRate(10);
        this.setState(new LobbyRoomState_1.LobbyRoomState());
        this.state.lobbyData.gameTime = 5;
        this.state.lobbyData.maxPlayer = 10;
        LobbyRoomManager_1.LobbyRoomManager.AddRoom(this);
        this.netMessageSystem = new NETMessageSystem_1.NETMessageSystem(this);
        new LobbyDataComponent_1.LobbyDataComponent(this, this.netMessageSystem);
        new StartGameComponent_1.StartGameComponent(this, this.netMessageSystem);
        this.onMessage("KICK", (client, message) => {
            for (let i in this.clients) {
                if (this.clients[i].sessionId == message) {
                    this.clients[i].send("KICK", this.state.players.get(message).playerID);
                    break;
                }
            }
        });
    }
    onAuth(client, options) {
        if (this.state.lobbyData.maxPlayer <= this.state.players.size) {
            throw new colyseus_1.ServerError(25601, "Room is already full!");
        }
        else {
            return true;
        }
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        if (this.clients.length <= 1) {
            this.state.lobbyData.hostID = client.sessionId;
            this.state.lobbyData.hostName = options.playerName;
        }
        NewLobbyRoom.UpdateJoinable(this);
        let player = new LobbyPlayer_1.LobbyPlayer();
        player.playerID = client.sessionId;
        player.playerName = options.playerName;
        player.playerColor = options.playerColor;
        player.playerLevel = options.playerLevel;
        this.state.players.set(player.playerID, player);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        if (this.state.players.has(client.sessionId))
            this.state.players.delete(client.sessionId);
        if (client.sessionId == this.state.lobbyData.hostID && this.state.players.size > 0) {
            this.state.lobbyData.hostID = GetFirstItem(this.state.players).playerID;
            this.state.lobbyData.hostName = GetFirstItem(this.state.players).playerName;
        }
        NewLobbyRoom.UpdateJoinable(this);
        //console.log("###")
        //console.log(GetFirstItem(this.state.players));
    }
    onDispose() {
        LobbyRoomManager_1.LobbyRoomManager.RemoveRoom(this);
        console.log("room", this.roomId, "disposing...");
    }
    static UpdateJoinable(room) {
        room.state.lobbyData.joinable = (room.state.lobbyData.isPublic && room.clients.length < room.state.lobbyData.maxPlayer && !room.state.lobbyData.gameStarted);
    }
}
exports.NewLobbyRoom = NewLobbyRoom;
function GetFirstItem(map) {
    let item;
    map.forEach((value, key) => {
        item = value;
    });
    return item;
}
