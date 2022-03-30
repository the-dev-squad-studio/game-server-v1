import { Client, Room, ServerError } from "colyseus";
import { LobbyPlayer } from "../../States/LobbyRoomState/LobbyPlayer";
import { LobbyRoomState } from "../../States/LobbyRoomState/LobbyRoomState";
import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { LobbyDataComponent } from "./LobbyDataComponent";
import { LobbyRoomManager } from "../../Global/LobbyRoomManager";
import { StartGameComponent } from "./StartGameComponent";

export class NewLobbyRoom extends Room<LobbyRoomState>{
  netMessageSystem:NETMessageSystem;
  onCreate (options: any) {
    this.setPatchRate(10);
    this.setSeatReservationTime(60)
    this.setState(new LobbyRoomState());
    this.state.lobbyData.gameTime = 5;
    this.state.lobbyData.maxPlayer = 10;
    LobbyRoomManager.AddRoom(this);
    this.netMessageSystem = new NETMessageSystem(this);
    new LobbyDataComponent(this, this.netMessageSystem);
    new StartGameComponent(this, this.netMessageSystem);

    this.onMessage("KICK", (client:Client, message:string)=>{
      for(let i in this.clients){
        if(this.clients[i].sessionId == message){
          this.clients[i].send("KICK", this.state.players.get(message).playerID);
          break;
        }
      }
    });
  }
  onAuth(client: Client, options: {playerName:string, playerColor:string, lobbyJoinType:string}){
    if(this.state.lobbyData.maxPlayer <= this.state.players.size){
      throw new ServerError(25601, "Room is already full!")
    }else{
      return true;
    }
  }

  onJoin (client: Client, options: {playerName:string, playerColor:string, playerLevel:number, uid:string}) {
    console.log(client.sessionId, "joined!");

    if(this.clients.length <= 1) {
      this.state.lobbyData.hostID = client.sessionId
      this.state.lobbyData.hostName = options.playerName
    }
    NewLobbyRoom.UpdateJoinable(this);

    let player = new LobbyPlayer();
    player.playerID = client.sessionId;
    player.playerName = options.playerName;
    player.playerColor = options.playerColor;
    player.playerLevel = options.playerLevel;
    this.state.players.set(player.playerID, player);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    if(this.state.players.has(client.sessionId)) this.state.players.delete(client.sessionId);
    if(client.sessionId == this.state.lobbyData.hostID && this.state.players.size > 0) {
      this.state.lobbyData.hostID = (GetFirstItem(this.state.players) as LobbyPlayer).playerID;      
      this.state.lobbyData.hostName = (GetFirstItem(this.state.players) as LobbyPlayer).playerName;  
    }
    NewLobbyRoom.UpdateJoinable(this);
    //console.log("###")
    //console.log(GetFirstItem(this.state.players));
  }

  onDispose() {
    LobbyRoomManager.RemoveRoom(this);
    console.log("room", this.roomId, "disposing...");
  }

  static UpdateJoinable(room:Room<LobbyRoomState>){
    room.state.lobbyData.joinable = (room.state.lobbyData.isPublic && room.clients.length < room.state.lobbyData.maxPlayer && !room.state.lobbyData.gameStarted)
  }
}

function GetFirstItem(map:MapSchema){
  let item;
  map.forEach((value, key) => {
      item = value;
  });
  return item;
}