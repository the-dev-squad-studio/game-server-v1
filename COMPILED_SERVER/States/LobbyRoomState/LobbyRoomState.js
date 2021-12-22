"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRoomState = exports.LobbyRoomData = void 0;
const schema_1 = require("@colyseus/schema");
const LobbyPlayer_1 = require("./LobbyPlayer");
class LobbyRoomData extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.seed = 0;
        this.hostID = "";
        this.maxPlayer = 10;
        this.gameTime = 0;
        this.isPublic = true;
        this.joinable = true;
    }
}
__decorate([
    (0, schema_1.type)("int32")
], LobbyRoomData.prototype, "seed", void 0);
__decorate([
    (0, schema_1.type)("string")
], LobbyRoomData.prototype, "hostID", void 0);
__decorate([
    (0, schema_1.type)("int32")
], LobbyRoomData.prototype, "maxPlayer", void 0);
__decorate([
    (0, schema_1.type)("int32")
], LobbyRoomData.prototype, "gameTime", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], LobbyRoomData.prototype, "isPublic", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], LobbyRoomData.prototype, "joinable", void 0);
exports.LobbyRoomData = LobbyRoomData;
class LobbyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.lobbyData = new LobbyRoomData();
        this.players = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)(LobbyRoomData)
], LobbyRoomState.prototype, "lobbyData", void 0);
__decorate([
    (0, schema_1.type)({ map: LobbyPlayer_1.LobbyPlayer })
], LobbyRoomState.prototype, "players", void 0);
exports.LobbyRoomState = LobbyRoomState;
