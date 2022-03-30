"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuRoom = void 0;
const colyseus_1 = require("colyseus");
const NETMessageSystem_1 = require("../../Global/NETMessageSystem");
const MainMenuState_1 = require("../../States/MainMenuState/MainMenuState");
const Config_1 = require("../../Global/Config");
class MainMenuRoom extends colyseus_1.Room {
    onCreate(options) {
        this.netMessageSystem = new NETMessageSystem_1.NETMessageSystem(this);
        this.setState(new MainMenuState_1.MainMenuState());
    }
    onAuth(client, options) {
        return !Config_1.CONFIG.maintenance && this.clients.length < Config_1.CONFIG.GetMaxPlayerCount();
    }
    onJoin(client, options) {
        console.log(options.playerName + " has logged in [" + client.sessionId + "]");
    }
    onLeave(client, consented) {
        console.log(client.sessionId + " logged out");
    }
    onDispose() {
    }
}
exports.MainMenuRoom = MainMenuRoom;
