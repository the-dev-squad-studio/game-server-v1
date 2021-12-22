"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETMessageSystem = void 0;
const MessageTokenManager_1 = require("./MessageTokenManager");
class NETMessageSystem {
    constructor(room) {
        this.messageBank = new Map();
        this.room = room;
        this.TokenMessageSetup(room);
        console.log("NETMessageSystem Init Done , Room: " + room.roomName);
    }
    OnMessage(type, callback) {
        var _a;
        console.log("on message set event called for: " + type);
        this.messageBank.set(type, callback);
        let room = this.room;
        (_a = this.room) === null || _a === void 0 ? void 0 : _a.onMessage(type, (client, message) => {
            this.EvaluateMessage(type, this.BuildClientMessage(client, message, room));
        });
    }
    SendWithCallBack(client, type, message, callback) {
        let token = MessageTokenManager_1.MessageTokenManager.AddMessage(callback);
        client.send("TOKEN_MESSAGE_S", {
            token, type, message
        });
    }
    EvaluateMessage(type, clientMessage) {
        (this.messageBank.get(type) || (() => { }))(clientMessage);
    }
    BuildClientMessage(client, message, room) {
        let clientMessage = {
            client,
            message,
            room: room,
            Reply(type, _message) {
                client.send(type, _message);
            },
            ReplyWithCallback(type, _message, callback) {
                let token = MessageTokenManager_1.MessageTokenManager.AddMessage(callback);
                client.send("TOKEN_MESSAGE_S", {
                    token, type, _message
                });
            }
        };
        return clientMessage;
    }
    TokenMessageSetup(room) {
        room.onMessage("TOKEN_MESSAGE_S", (client, message) => {
            console.log("TOKEN_MESSAGE_S");
            this.EvaluateMessage(message.type, {
                client,
                message: message.message,
                room,
                Reply(_type, _message) {
                    client.send("TOKEN_MESSAGE_R", {
                        token: message.token,
                        type: _type,
                        message: _message
                    });
                },
                ReplyWithCallback(_type, _message, callback) {
                    let token = MessageTokenManager_1.MessageTokenManager.AddMessage(callback);
                    client.send("TOKEN_MESSAGE_S", {
                        token: token,
                        type: _type,
                        message: _message
                    });
                }
            });
        });
        room.onMessage("TOKEN_MESSAGE_R", (client, message) => {
            console.log("TOKEN_MESSAGE_R");
            let clientMessage = this.BuildClientMessage(client, message.message, room);
            MessageTokenManager_1.MessageTokenManager.CheckMessage(message.token, () => {
                this.EvaluateMessage(message.type, clientMessage);
            }, clientMessage);
        });
    }
}
exports.NETMessageSystem = NETMessageSystem;
