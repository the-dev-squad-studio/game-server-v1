"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartGameComponent = void 0;
class StartGameComponent {
    constructor(room, netMessageSystem) {
        netMessageSystem.OnMessage("START_GAME", (clientMessage) => __awaiter(this, void 0, void 0, function* () {
            let seed = (room.state.lobbyData.seed == 0) ? this.GetRandomSeed() : room.state.lobbyData.seed;
            let gameTime = room.state.lobbyData.gameTime;
            //const newGameRoom = await matchMaker.createRoom("gameroom", { mode: "duo" });            
            room.broadcast("START_GAME", {
                seed: seed,
                gameTime: gameTime,
                gamrRoomID: clientMessage.message
            });
        }));
    }
    GetRandomSeed() {
        let seedRange = 9999999;
        return this.GetRandomInt(-seedRange, seedRange);
    }
    GetRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}
exports.StartGameComponent = StartGameComponent;
