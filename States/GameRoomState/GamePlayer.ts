import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export class GamePlayerData extends Schema{
    @type("string") playerName = "";
    @type("string") playerColor = "";
}

export class GamePlayerState extends Schema {
    @type("string") id = "";

    @type("float32") pX = 0;
    @type("float32") pY = 0;
    @type("float32") pZ = 0;

    @type("float32") hRH = 0;
    @type("float32") hRV = 0;
    @type("float32") bR = 0;

    @type("int32") a = 0;
    @type("int32") w = 0;
}
