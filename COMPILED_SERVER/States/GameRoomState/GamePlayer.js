"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePlayerState = exports.GamePlayerData = void 0;
const schema_1 = require("@colyseus/schema");
class GamePlayerData extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.playerID = "";
        this.playerName = "";
        this.playerColor = "";
        this.playerLevel = 0;
        this.isOnline = true;
        this.lastDamager = "";
        this.weaponIndex = -1;
        this.isOnShootingMode = false;
        this.playerHealth = 100;
        this.maxHealth = 100;
        this.killPoint = 0;
        this.killCount = 0;
        this.totalDamage = 0;
        this.totalDeath = 0;
    }
}
__decorate([
    (0, schema_1.type)("string")
], GamePlayerData.prototype, "playerID", void 0);
__decorate([
    (0, schema_1.type)("string")
], GamePlayerData.prototype, "playerName", void 0);
__decorate([
    (0, schema_1.type)("string")
], GamePlayerData.prototype, "playerColor", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "playerLevel", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], GamePlayerData.prototype, "isOnline", void 0);
__decorate([
    (0, schema_1.type)("string")
], GamePlayerData.prototype, "lastDamager", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "weaponIndex", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], GamePlayerData.prototype, "isOnShootingMode", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "playerHealth", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "maxHealth", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "killPoint", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "killCount", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "totalDamage", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerData.prototype, "totalDeath", void 0);
exports.GamePlayerData = GamePlayerData;
class GamePlayerState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.id = "";
        this.pX = 0;
        this.pY = 0;
        this.pZ = 0;
        this.hRH = 0;
        this.hRV = 0;
        this.bR = 0;
        this.a = 0;
        this.w = 0;
    }
}
__decorate([
    (0, schema_1.type)("string")
], GamePlayerState.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("float32")
], GamePlayerState.prototype, "pX", void 0);
__decorate([
    (0, schema_1.type)("float32")
], GamePlayerState.prototype, "pY", void 0);
__decorate([
    (0, schema_1.type)("float32")
], GamePlayerState.prototype, "pZ", void 0);
__decorate([
    (0, schema_1.type)("float32")
], GamePlayerState.prototype, "hRH", void 0);
__decorate([
    (0, schema_1.type)("float32")
], GamePlayerState.prototype, "hRV", void 0);
__decorate([
    (0, schema_1.type)("float32")
], GamePlayerState.prototype, "bR", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerState.prototype, "a", void 0);
__decorate([
    (0, schema_1.type)("int32")
], GamePlayerState.prototype, "w", void 0);
exports.GamePlayerState = GamePlayerState;
