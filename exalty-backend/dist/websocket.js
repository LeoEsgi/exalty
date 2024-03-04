"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wssPlugin = exports.wssCreate = void 0;
const WebSocket = __importStar(require("ws"));
const client_1 = require("@prisma/client");
const prisma_1 = require("./errors/prisma");
function wssCreate(server) {
    const prisma = new client_1.PrismaClient();
    //initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server });
    //our websocket purpose is to manage messages
    wss.on("connection", (ws) => __awaiter(this, void 0, void 0, function* () {
        ws.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
            console.log("received: %s", message);
            try {
                const data = JSON.parse(message);
                const liveMessage = yield prisma.liveMessage
                    .create({
                    data: {
                        message_content: data.message_content,
                        user_id: data.user_id,
                        collection_id: data.collection_id,
                    },
                })
                    .catch((e) => {
                    (0, prisma_1.prismaErrorHandler)().errorHandler(e, null, null, (e) => {
                        console.log(e);
                    });
                });
                // send to all clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(`${JSON.stringify(liveMessage)}`);
                    }
                });
            }
            catch (e) {
                console.log("error parsing message: ", e);
            }
        }));
        //send immediatly a feedback to the incoming connection
        ws.send("Hi there, I am a WebSocket server");
        // get the 10 latest messages from the database and send them to the client on connection
        const messages = yield prisma.liveMessage
            .findMany({
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        })
            .catch((e) => {
            (0, prisma_1.prismaErrorHandler)().errorHandler(e, null, null, (e) => {
                console.log(e);
            });
        });
        ws.send(JSON.stringify(messages));
    }));
    wss.on("close", () => {
        console.log("Closing WebSocket server...");
        prisma.$disconnect();
    });
    return wss;
}
exports.wssCreate = wssCreate;
function wssPlugin() {
    return {
        name: "wss-plugin",
        configureServer(server) {
            const wss = wssCreate(server);
            server.on("close", () => {
                console.log("Closing WebSocket server...");
                wss.close();
            });
        },
    };
}
exports.wssPlugin = wssPlugin;
