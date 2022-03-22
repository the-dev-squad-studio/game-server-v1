"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncPlayerGameData = void 0;
class SyncPlayerGameData {
    constructor(room, netMessageSystem) {
        room.onMessage("DAMAGE_PLAYER", (client, message) => {
            let playerData = room.state.playerDatas.get(message.target);
            let killerPlayerData = room.state.playerDatas.get(client.sessionId);
            if (playerData != null && killerPlayerData != null) {
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
                if (playerData.playerHealth <= 0) {
                    killerPlayerData.killCount += 1;
                    killerPlayerData.killPoint += this.CalculateKillPoint(killerPlayerData, playerData, message.amount);
                    playerData.totalDeath++;
                    playerData.playerHealth = playerData.maxHealth;
                    room.broadcast("DIE", message.target);
                    setTimeout(() => { room.broadcast("RESPAWN", message.target); }, 1000);
                }
            }
        });
    }
    CalculateKillPoint(killerPlayerData, victimPlayerData, damage) {
        let killPoint = 1;
        let killStrongPlayerPoint = Math.ceil(victimPlayerData.killCount / 2);
        let damageBonus = victimPlayerData.totalDamage > killerPlayerData.totalDamage ? 1 : 0;
        let firstDeathBonus = victimPlayerData.totalDeath == 0 ? 10 : 0;
        return killPoint + killStrongPlayerPoint + damageBonus + firstDeathBonus;
    }
}
exports.SyncPlayerGameData = SyncPlayerGameData;
