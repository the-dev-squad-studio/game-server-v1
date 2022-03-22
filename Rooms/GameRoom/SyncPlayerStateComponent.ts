import { Room } from "colyseus";
import { IClientMessage } from "../../Global/GameRoomInterfaces";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";

export class SyncPlayerComponent{
    constructor(room:Room<GameRoomState>, netMessageSystem:NETMessageSystem){
        netMessageSystem.OnMessage("SYNC", (clientMessage:IClientMessage)=>{
            //console.log(clientMessage.message);
            room.state.playerStates.set(clientMessage.client.sessionId, clientMessage.message);
        });
    }
}