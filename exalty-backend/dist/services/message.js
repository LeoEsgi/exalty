"use strict";
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MessageService {
    constructor() { }
    static getInstance() {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }
    createMessage(message_content, user_id, collection_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message
                .create({
                data: {
                    message_content: message_content,
                    user_id: user_id,
                    collection_id: collection_id,
                },
            });
        });
    }
    getMessageById(message_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findUnique({
                where: {
                    message_id: message_id,
                },
            });
        });
    }
    getMessageByCollectionId(collection_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    collection_id: collection_id,
                },
            });
        });
    }
    getMessageByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    user_id: user_id,
                },
            });
        });
    }
    getMessageByUserAndCollectionId(user_id, collection_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    user_id: user_id,
                    collection_id: collection_id,
                },
            });
        });
    }
    fullTextSearch(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    message_content: {
                        search: searchText,
                    },
                },
            });
        });
    }
    fullTextSearchAnd(searchText, searchText2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    message_content: {
                        search: searchText + " & " + searchText2,
                    },
                },
            });
        });
    }
    fullTextSearchOr(searchText, searchText2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    message_content: {
                        search: searchText + " | " + searchText2,
                    },
                },
            });
        });
    }
    fullTextSearchNot(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    message_content: {
                        search: "!" + searchText,
                    },
                },
            });
        });
    }
    fullTextSearchNear(searchText, searchText2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    message_content: {
                        search: searchText + " <-> " + searchText2,
                    },
                },
            });
        });
    }
}
exports.default = MessageService;
