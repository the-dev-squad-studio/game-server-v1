import { Room } from "colyseus";
import { IClientMessage } from "../../Global/GameRoomInterfaces";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { LobbyRoomState } from "../../States/LobbyRoomState/LobbyRoomState";
import { NewLobbyRoom } from "./LobbyRoom";
import { matchMaker } from "colyseus";

export class StartGameComponent{
    constructor(room:Room<LobbyRoomState>, netMessageSystem:NETMessageSystem){
        netMessageSystem.OnMessage("START_GAME", async (clientMessage:IClientMessage)=>{
            let seed = (room.state.lobbyData.seed == 0) ? this.GetRandomSeed() : room.state.lobbyData.seed;
            let gameTime = room.state.lobbyData.gameTime;
            //const newGameRoom = await matchMaker.createRoom("gameroom", { mode: "duo" });            
            room.broadcast("START_GAME", {
                seed: seed,
                gameTime: gameTime,
                gamrRoomID: clientMessage.message
            });
        })        
    }

    GetRandomSeed(){
        let seedRange = 9999999;
        return this.GetRandomInt(-seedRange, seedRange);
    }

    GetRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }
}