"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const core_1 = require("@colyseus/core");
const ws_transport_1 = require("@colyseus/ws-transport");
const LobbyRoom_1 = require("./Rooms/LobbyRoom/LobbyRoom");
const LobbyRoomManager_1 = require("./Global/LobbyRoomManager");
const Config_1 = require("./Global/Config");
const GameRoom_1 = require("./Rooms/GameRoom/GameRoom");
const monitor_1 = require("@colyseus/monitor");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(Math.round(process.uptime()) + "");
});
app.get("/alive", (req, res) => {
    res.send("true");
});
app.use("/colyseus", (0, monitor_1.monitor)());
app.get("/get_lobbyroom", (req, res) => {
    res.send(LobbyRoomManager_1.LobbyRoomManager.GetJoinableLobbyRoomID());
});
app.get("/maintenance_mode", (req, res) => {
    res.send(Config_1.CONFIG.maintenance);
});
const server = (0, http_1.createServer)(app); // create the http server manually
exports.gameServer = new core_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server // provide the custom server for `WebSocketTransport`
    })
});
exports.gameServer.define("lobbyroom", LobbyRoom_1.NewLobbyRoom);
exports.gameServer.define("gameroom", GameRoom_1.GameRoom);
exports.gameServer.listen(parseInt(process.env.PORT) || 3000).then(() => console.log("Gameserver listening for connection"));
