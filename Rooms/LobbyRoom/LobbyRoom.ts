import { Client, Room } from "colyseus";
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
    this.setState(new LobbyRoomState());
    LobbyRoomManager.AddRoom(this);
    this.netMessageSystem = new NETMessageSystem(this);
    new LobbyDataComponent(this, this.netMessageSystem);
    new StartGameComponent(this, this.netMessageSystem);
  }

  onJoin (client: Client, options: {playerName:string, playerColor:string}) {
    console.log(client.sessionId, "joined!");

    if(this.clients.length <= 1) this.state.lobbyData.hostID = client.sessionId
    NewLobbyRoom.UpdateJoinable(this);

    let player = new LobbyPlayer();
    player.playerID = client.sessionId;
    player.playerName = options.playerName;
    player.playerColor = options.playerColor;
    this.state.players.set(player.playerID, player);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    if(this.state.players.has(client.sessionId)) this.state.players.delete(client.sessionId);
    if(client.sessionId == this.state.lobbyData.hostID && this.state.players.size > 0) this.state.lobbyData.hostID = (GetFirstItem(this.state.players) as LobbyPlayer).playerID;
    NewLobbyRoom.UpdateJoinable(this);
    //console.log("###")
    //console.log(GetFirstItem(this.state.players));
  }

  onDispose() {
    LobbyRoomManager.RemoveRoom(this);
    console.log("room", this.roomId, "disposing...");
  }

  static UpdateJoinable(room:Room<LobbyRoomState>){
    room.state.lobbyData.joinable = (room.state.lobbyData.isPublic && room.clients.length < room.state.lobbyData.maxPlayer)
  }
}

function GetFirstItem(map:MapSchema){
  let item;
  map.forEach((value, key) => {
      item = value;
  });
  return item;
}