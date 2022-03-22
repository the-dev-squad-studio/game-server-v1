import { CollectionSchema, Context, MapSchema, Schema, type } from "@colyseus/schema";

export class LobbyPlayer extends Schema{
    @type("string") playerID = "";
    @type("string") playerName = "";
    @type("string") playerColor = "";
    @type("int32") playerLevel = 0;
    
    @type("boolean") isReady = false;
}
