import { CollectionSchema, Context, MapSchema, Schema } from "@colyseus/schema";
const type = Context.create();

export class LobbyPlayer extends Schema{
    @type("string") playerID = "";
    @type("string") playerName = "";
    @type("string") playerColor = "";
    
    @type("boolean") isReady = false;
}
