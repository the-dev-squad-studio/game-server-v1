"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoomState = exports.GameRoomData = void 0;
const schema_1 = require("@colyseus/schema");
const GamePlayer_1 = require("./GamePlayer");
class GameRoomData extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.seed = 0;
        this.gameTime = 0;
    }
}
__decorate([
    (0, schema_1.type)("int32")
], GameRoomData.prototype, "seed", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GameRoomData.prototype, "gameTime", void 0);
exports.GameRoomData = GameRoomData;
class GameRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.gameData = new GameRoomData();
        this.playerDatas = new schema_1.MapSchema();
        this.playerStates = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)(GameRoomData)
], GameRoomState.prototype, "gameData", void 0);
__decorate([
    (0, schema_1.type)({ map: GamePlayer_1.GamePlayerData })
], GameRoomState.prototype, "playerDatas", void 0);
__decorate([
    (0, schema_1.type)({ map: GamePlayer_1.GamePlayerState })
], GameRoomState.prototype, "playerStates", void 0);
exports.GameRoomState = GameRoomState;
