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
class GameService {
    constructor() { }
    static getInstance() {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.game.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.game.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getPlayers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.player.findMany({
                where: {
                    game_id: id,
                },
            });
        });
    }
    getAllPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.player.findMany();
        });
    }
    create(title, name, desc, img) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.game.create({
                data: {
                    title,
                    name,
                    desc,
                    img,
                },
            });
        });
    }
    addPlayer(name, role, img, game_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.player.create({
                data: {
                    name,
                    role,
                    img,
                    game_id,
                },
            });
        });
    }
    update(id, title, name, desc, img) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.game.upsert({
                where: {
                    id,
                },
                update: {
                    title,
                    name,
                    desc,
                    img,
                },
                create: {
                    title,
                    name,
                    desc,
                    img,
                },
            });
        });
    }
}
exports.default = GameService;
