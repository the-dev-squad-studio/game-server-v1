"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const core_1 = require("@colyseus/core");
const ws_transport_1 = require("@colyseus/ws-transport");
const LobbyRoom_1 = require("./Rooms/LobbyRoom/LobbyRoom");
const LobbyRoomManager_1 = require("./Global/LobbyRoomManager");
const Config_1 = require("./Global/Config");
const GameRoom_1 = require("./Rooms/GameRoom/GameRoom");
const MainMenuRoom_1 = require("./Rooms/MainMenuRoom/MainMenuRoom");
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
let ArenaData = {
    getId: () => "Your Colyseus App",
    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define("lobbyroom", LobbyRoom_1.NewLobbyRoom);
        gameServer.define("gameroom", GameRoom_1.GameRoom);
        gameServer.define("mainmenuroom", MainMenuRoom_1.MainMenuRoom);
    },
    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send(Math.round(process.uptime()) + "");
        });
        app.use("/colyseus", (0, monitor_1.monitor)());
        app.get("/get_lobbyroom", (req, res) => {
            res.send(LobbyRoomManager_1.LobbyRoomManager.GetJoinableLobbyRoomID());
        });
        app.get("/get_room_list", (req, res) => {
            res.send(LobbyRoomManager_1.LobbyRoomManager.GetRoomList());
        });
        app.get("/maintenance_mode", (req, res) => {
            res.send(Config_1.CONFIG.maintenance.toString());
        });
    },
    beforeListen: () => {
        console.log("Gameserver started with : " + `MAX_PLAYER_COUNT:${Config_1.CONFIG.GetMaxPlayerCount()}`);
    }
};
module.exports = (0, arena_1.default)(ArenaData);
let eApp = (0, express_1.default)();
let gameserver = new core_1.Server({
    transport: new ws_transport_1.WebSocketTransport({})
});
ArenaData.initializeExpress(eApp);
ArenaData.initializeGameServer(gameserver);
if (process.env.NOT_LOCAL != "true")
    gameserver.listen(parseInt(process.env.PORT) || 3000).then(() => console.log("Gameserver started with : " + `MAX_PLAYER_COUNT:${Config_1.CONFIG.GetMaxPlayerCount()}`));
