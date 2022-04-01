"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const core_1 = require("@colyseus/core");
const LobbyRoom_1 = require("./Rooms/LobbyRoom/LobbyRoom");
const LobbyRoomManager_1 = require("./Global/LobbyRoomManager");
const Config_1 = require("./Global/Config");
const GameRoom_1 = require("./Rooms/GameRoom/GameRoom");
const MainMenuRoom_1 = require("./Rooms/MainMenuRoom/MainMenuRoom");
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
const Data_1 = require("./Data");
function GetFreeSeatForGameRoom() {
    let total = 0;
    let max = Config_1.CONFIG.GetMaxPlayerCount();
    Data_1.allGamerooms.forEach((value, key) => {
        total += value.clients.length;
    });
    Data_1.reservedRooms.forEach((value, key) => {
        total += value;
    });
    console.log("MAX: " + max);
    console.log("TOTAL: " + total);
    return max - total;
}
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
        app.get("/book_gameroom", (req, res) => {
            let uid = req.query.uid + "";
            let size = parseInt(req.query.size + "");
            let result = "false";
            if (GetFreeSeatForGameRoom() - size > 0) {
                result = "true";
                Data_1.reservedRooms.set(uid, size);
            }
            res.send(result);
            setTimeout(() => {
                if (Data_1.reservedRooms.has(uid + "")) {
                    Data_1.reservedRooms.delete(uid);
                }
            }, 30000);
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
if (!process.env.NOT_LOCAL) {
    let eApp = (0, express_1.default)();
    eApp.use(express_1.default.json());
    const gameServer = new core_1.Server({
        server: (0, http_1.createServer)(eApp)
    });
    ArenaData.initializeExpress(eApp);
    ArenaData.initializeGameServer(gameServer);
    gameServer.listen(parseInt(process.env.PORT) || 3000).then(() => console.log("Gameserver normally started with : " + `MAX_PLAYER_COUNT:${Config_1.CONFIG.GetMaxPlayerCount()}`));
}
module.exports = (0, arena_1.default)({
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
        app.get("/book_gameroom", (req, res) => {
            let uid = req.query.uid + "";
            let size = parseInt(req.query.size + "");
            let result = "false";
            if (GetFreeSeatForGameRoom() - size > 0) {
                result = "true";
                Data_1.reservedRooms.set(uid, size);
            }
            res.send(result);
            setTimeout(() => {
                if (Data_1.reservedRooms.has(uid + "")) {
                    Data_1.reservedRooms.delete(uid);
                }
            }, 30000);
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
});
