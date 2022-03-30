import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export class MainMenuPlayer extends Schema {
    @type("string") playerID = "";
    @type("string") playerName = "";
}