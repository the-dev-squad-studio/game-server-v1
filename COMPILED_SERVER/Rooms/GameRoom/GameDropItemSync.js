"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDropItemSync = void 0;
class GameDropItemSync {
    constructor(room, netMessageSystem) {
        room.onMessage("REMOVE_DROP_ITEM", (client, message) => {
        });
    }
}
exports.GameDropItemSync = GameDropItemSync;
