export let CONFIG = {
    maintenance: false,
    GetMaxPlayerCount():number{
        return parseInt(process.env.MAX_PLAYER_COUNT) || 500
    },
    noUserExistCheck: true,
    password: "hello",
    JSON_DBName:"myDB",
    firebaseURL: "https://island-game-db-default-rtdb.asia-southeast1.firebasedatabase.app/db1/",
    masterServer:{
        url: "https://island-game-master-server.shiktotech.repl.co/",
        get newTagURL() {return CONFIG.masterServer.url + "newtag"},
        get hasTagURL() {return CONFIG.masterServer.url + "hastag"},   
        get playerDataURL() {return CONFIG.masterServer.url + "playerdata"},        
    }
}