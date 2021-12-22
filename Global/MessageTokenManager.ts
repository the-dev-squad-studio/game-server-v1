import { Client } from "colyseus";
import { IClientMessage } from "./GameRoomInterfaces";

let tokenMap:Map<string, Function> = new Map<string, Function>();

export class MessageTokenManager{
    static CheckMessage(token: string, callback:Function, clientMessage:IClientMessage){
        let func = callback
        if(tokenMap.has(token)){
            func = tokenMap.get(token) || func
            tokenMap.delete(token)
        }
        func(clientMessage)
    }

    static AddMessage(callback:Function):string{
        let token = Date.now + "_" + RandomID()
        tokenMap.set(token, callback)
        return token
    }
}

function RandomID():string{
    let tag = ""
    let characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"]
    for(let i=0;i<6;i++){
      tag += characters[Math.floor(Math.random()*characters.length)];
    }
    return tag.toLowerCase();
  }