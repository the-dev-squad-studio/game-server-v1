import { Room } from "colyseus";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GamePlayerData } from "../../States/GameRoomState/GamePlayer";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";

export class StartGameRoomGameComponent{
    public targetTime:number = 0;
    constructor(room:Room<GameRoomState>, netMessageSystem:NETMessageSystem){
        this.targetTime = room.state.gameData.gameTime * 60;
        console.log("GAME_TIME INIT")
        console.log(room.state.gameData.gameTime)
        console.log("target time")
        console.log(this.targetTime)
        let count:number = 0;
        setTimeout(()=>{
            for(let i in room.clients){
                room.clients[i].send("START", count);
                count++;
            }
        }, 5000);

        this.Tick(room);
    }

    GameOver(room:Room<GameRoomState>){
        let winnerPlayer = ""
        let lastKillPoint = -1;
        for(let i in room.clients){
            let tPlayerData = room.state.playerDatas.get(room.clients[i].sessionId)
            if(tPlayerData.killPoint > lastKillPoint){
                winnerPlayer = room.clients[i].sessionId;
            }
        }
        room.broadcast("GAME_OVER", winnerPlayer);
    }

    Tick(room:Room<GameRoomState>){
        if(this.targetTime > 0){
            this.targetTime --;

            room.broadcast("GAME_TIME", this.targetTime);

            setTimeout(()=>{this.Tick(room)}, 1000);
        }else{
            this.GameOver(room);
        }
    }
}