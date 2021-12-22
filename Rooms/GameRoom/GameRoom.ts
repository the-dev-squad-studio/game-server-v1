import { Client, Room } from "colyseus";
import { IClientMessage } from "../../Global/GameRoomInterfaces";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GamePlayerData, GamePlayerState } from "../../States/GameRoomState/GamePlayer";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";
import { SyncPlayerComponent } from "./SyncPlayerStateComponent";

export class GameRoom extends Room<GameRoomState>{
    netMessageSystem:NETMessageSystem;
    onCreate (options: any) {
        this.setState(new GameRoomState());
        this.netMessageSystem = new NETMessageSystem(this);
        new SyncPlayerComponent(this, this.netMessageSystem);

        this.netMessageSystem.OnMessage("PING", (clientMessage:IClientMessage)=>{clientMessage.client.send("PING", "")});
    }

    onJoin (client: Client, options: {playerName:string, playerColor:string}) {
        console.log(client.sessionId, "joined!");

        let playerData = new GamePlayerData();
        playerData.playerName = options.playerName;
        playerData.playerColor = options.playerColor;
        this.state.playerDatas.set(client.sessionId, playerData);
        
        let playerState = new GamePlayerState();
        playerState.id = client.id;
        this.state.playerStates.set(client.sessionId, playerState);
    }

    onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
        //return;
        if(this.state.playerDatas.has(client.sessionId)) this.state.playerDatas.delete(client.sessionId);
        if(this.state.playerStates.has(client.sessionId)) this.state.playerStates.delete(client.sessionId);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}