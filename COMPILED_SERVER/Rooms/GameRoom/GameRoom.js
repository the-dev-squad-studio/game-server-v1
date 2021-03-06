"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const colyseus_1 = require("colyseus");
const Data_1 = require("../../Data");
const NETMessageSystem_1 = require("../../Global/NETMessageSystem");
const GamePlayer_1 = require("../../States/GameRoomState/GamePlayer");
const GameRoomState_1 = require("../../States/GameRoomState/GameRoomState");
const GameDropItemSync_1 = require("./GameDropItemSync");
const StartGameComponent_1 = require("./StartGameComponent");
const SyncPlayerGameData_1 = require("./SyncPlayerGameData");
const SyncPlayerStateComponent_1 = require("./SyncPlayerStateComponent");
class GameRoom extends colyseus_1.Room {
    onCreate(options) {
        Data_1.allGamerooms.set(this.roomId, this);
        Data_1.reservedRooms.delete(options.uid);
        this.setPatchRate(30);
        this.setState(new GameRoomState_1.GameRoomState());
        this.state.gameData.gameTime = options.gameTime;
        this.netMessageSystem = new NETMessageSystem_1.NETMessageSystem(this);
        new SyncPlayerStateComponent_1.SyncPlayerComponent(this, this.netMessageSystem);
        this.startGameRoomGameComponent = new StartGameComponent_1.StartGameRoomGameComponent(this, this.netMessageSystem);
        new SyncPlayerGameData_1.SyncPlayerGameData(this, this.netMessageSystem);
        new GameDropItemSync_1.GameDropItemSync(this, this.netMessageSystem);
        this.netMessageSystem.OnMessage("PING", (clientMessage) => { clientMessage.client.send("PING", ""); });
        this.onMessage("SET_WEAPON_INDEX", (client, message) => {
            this.state.playerDatas.get(client.sessionId).weaponIndex = message;
        });
        this.onMessage("PICKUP_ITEM", (client, message) => {
            this.broadcast("PICKUP_ITEM", message);
        });
        this.onMessage("SHOOT", (client, message) => {
            this.broadcast("SHOOT", message);
        });
        this.onMessage("SHOOTING_MODE_ON", (client, message) => {
            this.state.playerDatas.get(client.sessionId).isOnShootingMode = true;
        });
        this.onMessage("SHOOTING_MODE_OFF", (client, message) => {
            this.state.playerDatas.get(client.sessionId).isOnShootingMode = false;
        });
        this.onMessage("CRATE_OPEN", (client, message) => {
            this.broadcast("CRATE_OPEN", message);
        });
        this.onMessage("CRATE_ITEM_CONSUME", (client, message) => {
            this.broadcast("CRATE_ITEM_CONSUME", message);
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        let playerData = new GamePlayer_1.GamePlayerData();
        playerData.playerName = options.playerName;
        playerData.isOnline = true;
        playerData.playerID = client.sessionId;
        playerData.playerLevel = options.playerLevel;
        playerData.maxHealth = options.maxHealth;
        playerData.playerHealth = options.maxHealth;
        playerData.playerColor = options.playerColor;
        this.state.playerDatas.set(client.sessionId, playerData);
        //this.state.playerStates.set(client.sessionId, "");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        //return;
        //if(this.state.playerDatas.has(client.sessionId)) this.state.playerDatas.delete(client.sessionId);
        //if(this.state.playerStates.has(client.sessionId)) this.state.playerStates.delete(client.sessionId);
        setTimeout(() => {
            if (this.state.playerDatas.has(client.sessionId))
                this.state.playerDatas.get(client.sessionId).isOnline = false;
            if (this.clients.length <= 1) {
                if (this.startGameRoomGameComponent.targetTime > 3)
                    this.startGameRoomGameComponent.targetTime = 3;
                if (this.clients[0]) {
                    this.clients[0].send("NOTIFY", "No other player is in the match right now");
                }
            }
        }, consented ? 0 : 10000);
    }
    onDispose() {
        Data_1.allGamerooms.delete(this.roomId);
        console.log("room", this.roomId, "disposing...");
    }
}
exports.GameRoom = GameRoom;
