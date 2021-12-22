//import { NETObjectData, PlayerState } from "../Rooms/States/DeathMatchState";
import { CollectionSchema, Context, MapSchema, Schema } from "@colyseus/schema";
import { Client, Room } from "colyseus";

/*
export interface IGameRoomState{
    players:MapSchema<PlayerState>;
    NETObjects:MapSchema<NETObjectData>;
}
*/

export interface IClientMessage{
    client:Client;
    message:any;
    room:Room<any> | Room<any, any> | Room | undefined;
    Reply(type:string, message:any):void;
    ReplyWithCallback(type:string, message:any, callback:Function):void;
}