import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export class GamePlayerData extends Schema{
    @type("string") playerID = "";
    @type("string") playerName = "";
    @type("string") playerColor = "";
    @type("int32") playerLevel = 0;
    @type("boolean") isOnline = true;

    @type("string") lastDamager = "";
    @type("int32") weaponIndex = -1;
    @type("boolean") isOnShootingMode = false;
    @type("int32") playerHealth = 100;
    @type("int32") maxHealth = 100;

    @type("int32") killPoint = 0;
    @type("int32") killCount = 0;
    @type("int32") totalDamage = 0;
    @type("int32") totalDeath= 0;
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
