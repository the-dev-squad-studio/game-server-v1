import { Client, Room } from "colyseus";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";

export class GameDropItemSync{
    constructor(room:Room<GameRoomState>, netMessageSystem:NETMessageSystem){
        room.onMessage("REMOVE_DROP_ITEM", (client:Client, message:{nameID:string, id:string})=>{
            
        });
    }
}