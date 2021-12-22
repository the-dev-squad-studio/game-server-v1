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
}