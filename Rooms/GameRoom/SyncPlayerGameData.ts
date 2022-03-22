import { Client, Room } from "colyseus";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { GamePlayerData } from "../../States/GameRoomState/GamePlayer";
import { GameRoomState } from "../../States/GameRoomState/GameRoomState";

export class SyncPlayerGameData{
    constructor(room:Room<GameRoomState>, netMessageSystem:NETMessageSystem){
        room.onMessage("DAMAGE_PLAYER", (client:Client, message:{target:string, amount:number, x:number, y:number, z:number})=>{
            let playerData:GamePlayerData = room.state.playerDatas.get(message.target)
            let killerPlayerData:GamePlayerData = room.state.playerDatas.get(client.sessionId)

            if(playerData != null && killerPlayerData != null){

                playerData.playerHealth -= message.amount;
                playerData.lastDamager = client.sessionId;

                killerPlayerData.totalDamage += message.amount;

                room.broadcast("GET_DAMAGE", JSON.stringify({
                    target: message.target,
                    position: {
                        x: message.x,
                        y: message.y, 
                        z: message.z
                    },
                    health: playerData.playerHealth
                }));

                if(playerData.playerHealth <= 0){
                    killerPlayerData.killCount += 1;
                    killerPlayerData.killPoint += this.CalculateKillPoint(killerPlayerData, playerData, message.amount)

                    playerData.totalDeath ++;
                    playerData.playerHealth = playerData.maxHealth;

                    room.broadcast("DIE", message.target);

                    setTimeout(()=>{room.broadcast("RESPAWN", message.target)}, 1000)
                }
            }
        });

    }

    CalculateKillPoint(killerPlayerData:GamePlayerData, victimPlayerData:GamePlayerData, damage:number):number{
        let killPoint = 1;
        let killStrongPlayerPoint = Math.ceil(victimPlayerData.killCount / 2);
        let damageBonus = victimPlayerData.totalDamage > killerPlayerData.totalDamage ? 1 : 0;
        let firstDeathBonus = victimPlayerData.totalDeath == 0 ? 10 : 0;

        return killPoint + killStrongPlayerPoint + damageBonus + firstDeathBonus;
    }
}