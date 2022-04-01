"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartGameRoomGameComponent = void 0;
class StartGameRoomGameComponent {
    constructor(room, netMessageSystem) {
        this.targetTime = 0;
        this.targetTime = room.state.gameData.gameTime * 60;
        console.log("GAME_TIME INIT");
        console.log(room.state.gameData.gameTime);
        console.log("target time");
        console.log(this.targetTime);
        let count = 0;
        setTimeout(() => {
            for (let i in room.clients) {
                room.clients[i].send("START", count);
                count++;
            }
        }, 7500);
        this.Tick(room);
    }
    GameOver(room) {
        let winnerPlayer = "";
        let lastKillPoint = -1;
        for (let i in room.clients) {
            let tPlayerData = room.state.playerDatas.get(room.clients[i].sessionId);
            if (tPlayerData.killPoint > lastKillPoint) {
                winnerPlayer = room.clients[i].sessionId;
            }
        }
        room.broadcast("GAME_OVER", winnerPlayer);
    }
    Tick(room) {
        if (this.targetTime > 0) {
            this.targetTime--;
            room.broadcast("GAME_TIME", this.targetTime);
            setTimeout(() => { this.Tick(room); }, 1000);
        }
        else {
            this.GameOver(room);
        }
    }
}
exports.StartGameRoomGameComponent = StartGameRoomGameComponent;
