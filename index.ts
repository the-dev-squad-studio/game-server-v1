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
app.use("/colyseus", monitor());

app.get("/get_lobbyroom", (req, res)=>{
  res.send(LobbyRoomManager.GetJoinableLobbyRoomID())
})
app.get("/maintenance_mode", (req, res)=>{
  res.send(CONFIG.maintenance)
})

const server = createServer(app); // create the http server manually

export const gameServer = new Server({
  transport: new WebSocketTransport({
      server // provide the custom server for `WebSocketTransport`
  })
});

gameServer.define("lobbyroom", NewLobbyRoom)
gameServer.define("gameroom", GameRoom)

gameServer.listen(parseInt(process.env.PORT) || 3000).then(()=> console.log("Gameserver listening for connection"));