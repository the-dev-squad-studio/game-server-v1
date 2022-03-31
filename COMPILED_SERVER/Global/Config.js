"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    maintenance: false,
    GetMaxPlayerCount() {
        return parseInt(process.env.MAX_PLAYER_COUNT) || 500;
    },
    noUserExistCheck: true,
    password: "hello",
    JSON_DBName: "myDB",
    firebaseURL: "https://island-game-db-default-rtdb.asia-southeast1.firebasedatabase.app/db1/",
    masterServer: {
        url: "https://island-game-master-server.shiktotech.repl.co/",
        get newTagURL() { return exports.CONFIG.masterServer.url + "newtag"; },
        get hasTagURL() { return exports.CONFIG.masterServer.url + "hastag"; },
        get playerDataURL() { return exports.CONFIG.masterServer.url + "playerdata"; },
    }
};
