import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { GamePlayerData, GamePlayerState } from "./GamePlayer";

export class GameRoomData extends Schema {
  @type("int32") seed = 0;
  @type("int32") gameTime = 0;
}

export class GameRoomState extends Schema{
  @type(GameRoomData) gameData = new GameRoomData();
  @type({ map: GamePlayerData }) playerDatas = new MapSchema<GamePlayerData>();
  @type({ map: GamePlayerState }) playerStates = new MapSchema<GamePlayerState>();
}