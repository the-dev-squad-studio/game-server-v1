import express from "express";
import expressify from "uwebsockets-express"
import { createServer } from "http";
import { Client, Room, Server } from "@colyseus/core";
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
import { allGamerooms, reservedRooms } from "./Data";

function GetFreeSeatForGameRoom():number {
  let total = 0;
  let max = CONFIG.GetMaxPlayerCount()
  allGamerooms.forEach((value: Room, key: string) => {
    total += value.clients.length;
  });
  reservedRooms.forEach((value: number, key: string) => {
    total += value;
  });
  console.log("MAX: " + max)
  console.log("TOTAL: " + total)
  return max - total
}

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
      app.get("/book_gameroom", (req, res)=>{
        let uid = req.query.uid + "";
        let size = parseInt(req.query.size + "");
        let result = "false"
        if(GetFreeSeatForGameRoom() - size > 0){
          result = "true"
          reservedRooms.set(uid, size)
        }
        res.send(result)

        setTimeout(() => {
          if(reservedRooms.has(uid + "")){
            reservedRooms.delete(uid);
          }
        }, 30000);
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


if(!process.env.NOT_LOCAL) {

  let eApp = express()
  eApp.use(express.json());

  const gameServer = new Server({
    server: createServer(eApp),
  });

  ArenaData.initializeExpress(eApp)
  ArenaData.initializeGameServer(gameServer)



  gameServer.listen(parseInt(process.env.PORT) || 3000).then(()=> console.log("Gameserver normally started with : " + `MAX_PLAYER_COUNT:${CONFIG.GetMaxPlayerCount()}`));
}


module.exports = Arena({
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
      app.get("/book_gameroom", (req, res)=>{
        let uid = req.query.uid + "";
        let size = parseInt(req.query.size + "");
        let result = "false"
        if(GetFreeSeatForGameRoom() - size > 0){
          result = "true"
          reservedRooms.set(uid, size)
        }
        res.send(result)

        setTimeout(() => {
          if(reservedRooms.has(uid + "")){
            reservedRooms.delete(uid);
          }
        }, 30000);
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

});
