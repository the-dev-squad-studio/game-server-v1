"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameServer = void 0;
const express_1 = __importDefault(require("express"));
const uwebsockets_express_1 = __importDefault(require("uwebsockets-express"));
const core_1 = require("@colyseus/core");
//import { WebSocketTransport } from "@colyseus/ws-transport"
const uwebsockets_transport_1 = require("@colyseus/uwebsockets-transport");
const LobbyRoom_1 = require("./Rooms/LobbyRoom/LobbyRoom");
const LobbyRoomManager_1 = require("./Global/LobbyRoomManager");
const Config_1 = require("./Global/Config");
const GameRoom_1 = require("./Rooms/GameRoom/GameRoom");
const monitor_1 = require("@colyseus/monitor");
const MainMenuRoom_1 = require("./Rooms/MainMenuRoom/MainMenuRoom");
let transport = new uwebsockets_transport_1.uWebSocketsTransport({});
const app = (0, uwebsockets_express_1.default)(transport.app);
// use existing middleware implementations!
app.use(express_1.default.json());
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
//const server = createServer(app); // create the http server manually
exports.gameServer = new core_1.Server({
    transport
});
exports.gameServer.define("lobbyroom", LobbyRoom_1.NewLobbyRoom);
exports.gameServer.define("gameroom", GameRoom_1.GameRoom);
exports.gameServer.define("mainmenuroom", MainMenuRoom_1.MainMenuRoom);
//gameServer.simulateLatency(250)
exports.gameServer.listen(parseInt(process.env.PORT) || 3000).then(() => console.log("Gameserver started with : " + `MAX_PLAYER_COUNT:${Config_1.CONFIG.GetMaxPlayerCount()}`));
