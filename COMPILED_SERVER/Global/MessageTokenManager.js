"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTokenManager = void 0;
let tokenMap = new Map();
class MessageTokenManager {
    static CheckMessage(token, callback, clientMessage) {
        let func = callback;
        if (tokenMap.has(token)) {
            func = tokenMap.get(token) || func;
            tokenMap.delete(token);
        }
        func(clientMessage);
    }
    static AddMessage(callback) {
        let token = Date.now + "_" + RandomID();
        tokenMap.set(token, callback);
        return token;
    }
}
exports.MessageTokenManager = MessageTokenManager;
function RandomID() {
    let tag = "";
    let characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
    for (let i = 0; i < 6; i++) {
        tag += characters[Math.floor(Math.random() * characters.length)];
    }
    return tag.toLowerCase();
}
