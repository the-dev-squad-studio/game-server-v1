"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyPlayer = void 0;
const schema_1 = require("@colyseus/schema");
class LobbyPlayer extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.playerID = "";
        this.playerName = "";
        this.playerColor = "";
        this.playerLevel = 0;
        this.isReady = false;
    }
}
__decorate([
    (0, schema_1.type)("string")
], LobbyPlayer.prototype, "playerID", void 0);
__decorate([
    (0, schema_1.type)("string")
], LobbyPlayer.prototype, "playerName", void 0);
__decorate([
    (0, schema_1.type)("string")
], LobbyPlayer.prototype, "playerColor", void 0);
__decorate([
    (0, schema_1.type)("int32")
], LobbyPlayer.prototype, "playerLevel", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], LobbyPlayer.prototype, "isReady", void 0);
exports.LobbyPlayer = LobbyPlayer;
