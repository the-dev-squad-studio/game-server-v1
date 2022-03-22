import { NewLobbyRoom } from "../Rooms/LobbyRoom/LobbyRoom";

export class LobbyRoomManager{
    static lobbyRooms:Map<string, NewLobbyRoom> = new Map<string, NewLobbyRoom>();
    
    static AddRoom(room:NewLobbyRoom){
        this.lobbyRooms.set(room.roomId, room);
    }
    static RemoveRoom(room:NewLobbyRoom){
        if(this.lobbyRooms.has(room.roomId)) this.lobbyRooms.delete(room.roomId);
    }
    static GetJoinableLobbyRoomID():string{
        let id = ""
        this.lobbyRooms.forEach((value:NewLobbyRoom, key) => {
            if(id != "") return;
            if(value.state.lobbyData.joinable) id = key;
        });
        return id;
    }
    static GetRoomList():string{
        let ids:RoomData[] = []
        this.lobbyRooms.forEach((value:NewLobbyRoom, key) => {
            if(ids.length > 20) return;
            if(value.state.lobbyData.joinable) ids.push({
                roomName: value.state.lobbyData.hostName,
                roomID: key,
                mapIndex: 0,
                currentPlayerCount: value.state.players.size,
                maxPlayerCount: value.state.lobbyData.maxPlayer,
                gameTime: value.state.lobbyData.gameTime
            })
        });
        let result = ""
        for(let i in ids){
            result += JSON.stringify(ids[i]) + ";"
        }
        return result;
    }
}

export interface RoomData {
    roomName: string;
    roomID: string;
    mapIndex: number;
    currentPlayerCount: number;
    maxPlayerCount: number;
    gameTime: number;
}