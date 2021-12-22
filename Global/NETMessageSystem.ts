import { Client, Room } from "colyseus";
import { IClientMessage } from "./GameRoomInterfaces";
import { MessageTokenManager } from "./MessageTokenManager";

export class NETMessageSystem{
    private messageBank:Map<string, Function> = new Map<string, Function>()
    private room:Room | undefined;

    constructor(room:Room){
        this.room = room
        this.TokenMessageSetup(room)
        console.log("NETMessageSystem Init Done , Room: " + room.roomName)
    }

    public OnMessage(type:string, callback:Function){
        console.log("on message set event called for: " + type)
        this.messageBank.set(type, callback)
        let room = this.room
        this.room?.onMessage(type, (client: Client, message: any)=>{
            this.EvaluateMessage(type, this.BuildClientMessage(client, message, room))
        })
    }

    public SendWithCallBack(client:Client, type:string, message:any, callback:Function){
        let token = MessageTokenManager.AddMessage(callback)
        client.send("TOKEN_MESSAGE_S", {
            token, type, message
        })
    }

    private EvaluateMessage(type:string, clientMessage:IClientMessage){
        (this.messageBank.get(type) || (()=>{}))(clientMessage)
    }

    private BuildClientMessage(client:Client, message:any, room:Room | undefined):IClientMessage{
        let clientMessage:IClientMessage = {
            client, 
            message,
            room: room,
            Reply(type:string, _message:any){
                client.send(type, _message)
            },
            ReplyWithCallback(type:string, _message:any, callback:Function){
                let token = MessageTokenManager.AddMessage(callback)
                client.send("TOKEN_MESSAGE_S", {
                    token, type, _message
                })
            }
        }
        return clientMessage
    }

    private TokenMessageSetup(room:Room){
        room.onMessage("TOKEN_MESSAGE_S", (client: Client, message: {token:string; type:string; message:object})=>{
            console.log("TOKEN_MESSAGE_S")
            this.EvaluateMessage(message.type, {
                client, 
                message: message.message,
                room,
                Reply(_type:string, _message:any){
                    client.send("TOKEN_MESSAGE_R", {
                        token: message.token, 
                        type: _type,
                        message: _message
                    })
                },
                ReplyWithCallback(_type:string, _message:any, callback:Function){
                    let token = MessageTokenManager.AddMessage(callback)
                    client.send("TOKEN_MESSAGE_S", {
                        token: token, 
                        type: _type,
                        message: _message
                    })
                }
            })
        })

        room.onMessage("TOKEN_MESSAGE_R", (client: Client, message: {token:string; type:string; message:object})=>{
            console.log("TOKEN_MESSAGE_R")
            let clientMessage:IClientMessage = this.BuildClientMessage(client, message.message, room)
            MessageTokenManager.CheckMessage(message.token, ()=>{
                this.EvaluateMessage(message.type, clientMessage)
            }, clientMessage)
        })
    }
}