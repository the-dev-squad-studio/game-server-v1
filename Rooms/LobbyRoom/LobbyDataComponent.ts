import { Room } from "colyseus";
import { IClientMessage } from "../../Global/GameRoomInterfaces";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { LobbyRoomState } from "../../States/LobbyRoomState/LobbyRoomState";
import { NewLobbyRoom } from "./LobbyRoom";

export class LobbyDataComponent{
    constructor(room:Room<LobbyRoomState>, netMessageSystem:NETMessageSystem){
        netMessageSystem.OnMessage("SET_GAME_TIME", (clientMessage:IClientMessage)=>{ room.state.lobbyData.gameTime = clientMessage.message; })
        netMessageSystem.OnMessage("SET_MAX_PLAYER", (clientMessage:IClientMessage)=>{ 
            room.state.lobbyData.maxPlayer = clientMessage.message; 
            NewLobbyRoom.UpdateJoinable(room);            
        })
        netMessageSystem.OnMessage("SET_IS_PUBLIC", (clientMessage:IClientMessage)=>{ 
            room.state.lobbyData.isPublic = clientMessage.message; 
            NewLobbyRoom.UpdateJoinable(room);            
        })
    }
}