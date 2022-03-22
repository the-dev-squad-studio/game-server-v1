import express from "express";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { NewLobbyRoom } from "./Rooms/LobbyRoom/LobbyRoom";
import { LobbyRoomManager } from "./Global/LobbyRoomManager";
import { CONFIG } from "./Global/Config";
import { matchMaker } from "colyseus";
import { GameRoom } from "./Rooms/GameRoom/GameRoom";
import { monitor } from "@colyseus/monitor";

const app = express();
app.use(express.json());
app.get("/", (req, res)=>{
  res.send(Math.round(process.uptime()) + "")
})
app.get("/alive", (req, res)=>{
  res.send("true")
})
app.use("/colyseus", monitor());

app.get("/get_lobbyroom", (req, res)=>{
  res.send(LobbyRoomManager.GetJoinableLobbyRoomID())
})
app.get("/get_room_list", (req, res)=>{
  res.send(LobbyRoomManager.GetRoomList())
})
app.get("/maintenance_mode", (req, res)=>{
  res.send(CONFIG.maintenance)
})

const server = createServer(app); // create the http server manually

export const gameServer = new Server({
  transport: new WebSocketTransport({
      server, // provide the custom server for `WebSocketTransport`
      pingMaxRetries : 20
  })
});

gameServer.define("lobbyroom", NewLobbyRoom)
gameServer.define("gameroom", GameRoom)
//gameServer.simulateLatency(250)

gameServer.listen(parseInt(process.env.PORT) || 3001).then(()=> console.log("Gameserver listening for connection"));
