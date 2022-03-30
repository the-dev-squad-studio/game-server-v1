import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { MainMenuPlayer } from "./MainMenuPlayer";

export class MainMenuState extends Schema {
    @type({ map: MainMenuPlayer }) players = new MapSchema<MainMenuPlayer>();
}