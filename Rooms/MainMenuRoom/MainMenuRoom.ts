import { Client, Room } from "colyseus";
import { NETMessageSystem } from "../../Global/NETMessageSystem";
import { MainMenuState } from "../../States/MainMenuState/MainMenuState";
import { CONFIG } from "../../Global/Config";

export class MainMenuRoom extends Room<MainMenuState>{
  netMessageSystem:NETMessageSystem;
  onCreate (options: any) {
    this.netMessageSystem = new NETMessageSystem(this);
    this.setState(new MainMenuState());
  }
  onAuth(client: Client, options: {playerName:string, playerColor:string, lobbyJoinType:string}){
    return !CONFIG.maintenance && this.clients.length < CONFIG.GetMaxPlayerCount()
  }

  onJoin (client: Client, options: {playerName:string, playerColor:string, playerLevel:number, uid:string}) {
    console.log(options.playerName + " has logged in [" + client.sessionId + "]");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId + " logged out");
  }

  onDispose() {
    
  }
}