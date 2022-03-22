import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { LobbyPlayer } from "./LobbyPlayer";

export class LobbyRoomData extends Schema {
  @type("int32") seed = 0;
  @type("string") hostID = "";
  @type("string") hostName = "";
  @type("int32") maxPlayer = 10;
  
  @type("boolean") gameStarted = false;

  @type("int32") gameTime = 3;
  @type("int32") islandTypeIndex = 0;
  @type("boolean") isPublic = true;
  @type("boolean") joinable = true;
}

export class LobbyRoomState extends Schema{
  @type(LobbyRoomData) lobbyData = new LobbyRoomData();
  @type({ map: LobbyPlayer }) players = new MapSchema<LobbyPlayer>();
}