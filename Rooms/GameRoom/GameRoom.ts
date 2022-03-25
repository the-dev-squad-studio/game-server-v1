import { Client, Room } from "colyseus";
import { IClientMessage } from "../../Global/GameRoomInterfaces";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GamePlayerData } from "../../States/GameRoomState/GamePlayer";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";
import { StartGameComponent } from "../LobbyRoom/StartGameComponent";
import { GameDropItemSync } from "./GameDropItemSync";
import { StartGameRoomGameComponent } from "./StartGameComponent";
import { SyncPlayerGameData } from "./SyncPlayerGameData";
import { SyncPlayerComponent } from "./SyncPlayerStateComponent";

export class GameRoom extends Room<GameRoomState>{
    netMessageSystem:NETMessageSystem;
    startGameRoomGameComponent:StartGameRoomGameComponent;
    onCreate (options: {playerName:string, playerColor:string, maxHealth:number, gameTime:number}) {
        this.setPatchRate(10);
        this.setState(new GameRoomState());
        this.state.gameData.gameTime = options.gameTime;
        this.netMessageSystem = new NETMessageSystem(this);
        new SyncPlayerComponent(this, this.netMessageSystem);
        this.startGameRoomGameComponent = new StartGameRoomGameComponent(this, this.netMessageSystem);
        new SyncPlayerGameData(this, this.netMessageSystem);
        new GameDropItemSync(this, this.netMessageSystem);

        this.netMessageSystem.OnMessage("PING", (clientMessage:IClientMessage)=>{clientMessage.client.send("PING", "")});
        this.onMessage("SET_WEAPON_INDEX", (client:Client, message:number)=>{
            this.state.playerDatas.get(client.sessionId).weaponIndex = message
        })
        this.onMessage("PICKUP_ITEM", (client:Client, message:string)=>{
            this.broadcast("PICKUP_ITEM", message);            
        });
        this.onMessage("SHOOT", (client:Client, message:string)=>{
            this.broadcast("SHOOT", message);            
        });
        this.onMessage("SHOOTING_MODE_ON", (client:Client, message:string)=>{
            this.state.playerDatas.get(client.sessionId).isOnShootingMode = true;       
        });
        this.onMessage("SHOOTING_MODE_OFF", (client:Client, message:string)=>{
            this.state.playerDatas.get(client.sessionId).isOnShootingMode = false;       
        });
        this.onMessage("CRATE_OPEN", (client:Client, message:string)=>{
            this.broadcast("CRATE_OPEN", message);
        });
        this.onMessage("CRATE_ITEM_CONSUME", (client:Client, message:string)=>{
            this.broadcast("CRATE_ITEM_CONSUME", message);
        });
    }

    onJoin (client: Client, options: {playerName:string, playerColor:string, maxHealth:number, playerLevel:number}) {
        console.log(client.sessionId, "joined!");

        let playerData = new GamePlayerData();
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

    onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
        //return;
        //if(this.state.playerDatas.has(client.sessionId)) this.state.playerDatas.delete(client.sessionId);
        //if(this.state.playerStates.has(client.sessionId)) this.state.playerStates.delete(client.sessionId);
        
        setTimeout(() => {
            if(this.state.playerDatas.has(client.sessionId)) this.state.playerDatas.get(client.sessionId).isOnline = false;
            if(this.clients.length <= 1){
                if(this.startGameRoomGameComponent.targetTime > 3) this.startGameRoomGameComponent.targetTime = 3;
                if(this.clients[0]){
                    this.clients[0].send("NOTIFY", "No other player is in the match right now");
                }
            }
        }, consented ? 0 : 10000);
        
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}