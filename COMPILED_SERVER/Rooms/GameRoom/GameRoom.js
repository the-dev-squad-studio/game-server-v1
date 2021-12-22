"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const colyseus_1 = require("colyseus");
const NETMessageSystem_1 = require("../../Global/NETMessageSystem");
const GamePlayer_1 = require("../../States/GameRoomState/GamePlayer");
const GameRoomState_1 = require("../../States/GameRoomState/GameRoomState");
const SyncPlayerStateComponent_1 = require("./SyncPlayerStateComponent");
class GameRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new GameRoomState_1.GameRoomState());
        this.netMessageSystem = new NETMessageSystem_1.NETMessageSystem(this);
        new SyncPlayerStateComponent_1.SyncPlayerComponent(this, this.netMessageSystem);
        this.netMessageSystem.OnMessage("PING", (clientMessage) => { clientMessage.client.send("PING", ""); });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        let playerData = new GamePlayer_1.GamePlayerData();
        playerData.playerName = options.playerName;
        playerData.playerColor = options.playerColor;
        this.state.playerDatas.set(client.sessionId, playerData);
        let playerState = new GamePlayer_1.GamePlayerState();
        playerState.id = client.id;
        this.state.playerStates.set(client.sessionId, playerState);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        //return;
        if (this.state.playerDatas.has(client.sessionId))
            this.state.playerDatas.delete(client.sessionId);
        if (this.state.playerStates.has(client.sessionId))
            this.state.playerStates.delete(client.sessionId);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.GameRoom = GameRoom;
