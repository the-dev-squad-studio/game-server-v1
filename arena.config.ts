import express from "express";
import expressify from "uwebsockets-express"
import { createServer } from "http";
import { Client, Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import { NewLobbyRoom } from "./Rooms/LobbyRoom/LobbyRoom";
import { LobbyRoomManager } from "./Global/LobbyRoomManager";
import { CONFIG } from "./Global/Config";
import { matchMaker } from "colyseus";
import { GameRoom } from "./Rooms/GameRoom/GameRoom";
import { MainMenuRoom } from "./Rooms/MainMenuRoom/MainMenuRoom";
import {default as Arena} from "@colyseus/arena"
import {monitor} from "@colyseus/monitor"


let ArenaData = {
  getId: () => "Your Colyseus App",

  initializeGameServer: (gameServer:Server) => {
      /**
       * Define your room handlers:
       */
      gameServer.define("lobbyroom", NewLobbyRoom)
      gameServer.define("gameroom", GameRoom)
      gameServer.define("mainmenuroom", MainMenuRoom)
  },

  initializeExpress: (app:express.Application) => {
      /**
       * Bind your custom express routes here:
       */
      app.get("/", (req, res)=>{
        res.send(Math.round(process.uptime()) + "")
      })
      app.use("/colyseus", monitor());
      
      app.get("/get_lobbyroom", (req, res)=>{
        res.send(LobbyRoomManager.GetJoinableLobbyRoomID())
      })
      app.get("/get_room_list", (req, res)=>{
        res.send(LobbyRoomManager.GetRoomList())
      })
      app.get("/maintenance_mode", (req, res)=>{
        res.send(CONFIG.maintenance.toString())
      })
  },

  beforeListen: () => {
    console.log("Gameserver started with : " + `MAX_PLAYER_COUNT:${CONFIG.GetMaxPlayerCount()}`)
  }

}

module.exports = Arena(ArenaData);


let eApp = express()

let gameserver = new Server({
  transport: new WebSocketTransport({

  })
})

ArenaData.initializeExpress(eApp)
ArenaData.initializeGameServer(gameserver)

if(process.env.NOT_LOCAL != "true") gameserver.listen(parseInt(process.env.PORT) || 3000).then(()=> console.log("Gameserver started with : " + `MAX_PLAYER_COUNT:${CONFIG.GetMaxPlayerCount()}`));
