import { Room } from "colyseus";
import { IClientMessage } from "../../Global/GameRoomInterfaces";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GamePlayerState } from "../../States/GameRoomState/GamePlayer";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";

export class SyncPlayerComponent{
    constructor(room:Room<GameRoomState>, netMessageSystem:NETMessageSystem){
        netMessageSystem.OnMessage("SET_PLAYER_STATE", (clientMessage:IClientMessage)=>{
            //console.log(clientMessage.message);
            let newState:GamePlayerState = clientMessage.message;
            let id = newState.id;
            if(room.state.playerStates.has(id)){
                let playerState = new GamePlayerState();
                Object.assign(playerState, newState);
                room.state.playerStates.set(id, playerState);
            }
        });
    }
}