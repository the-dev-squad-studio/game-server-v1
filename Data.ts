import { Room } from "colyseus";

export let allGamerooms:Map<string, Room> = new Map<string, Room>();
export let reservedRooms:Map<string, number> = new Map<string, number>();