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
class PlayerService {
    constructor() { }
    static getInstance() {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.player.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.player.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getByGameId(game_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.player.findMany({
                where: {
                    game_id,
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
    updatePlayer(id, name, role, img, game_id, deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            if (deleted) {
                return yield prisma.player.delete({
                    where: {
                        id,
                    },
                });
            }
            return yield prisma.player.upsert({
                where: {
                    id,
                },
                update: {
                    name,
                    role,
                    img,
                    game_id,
                },
                create: {
                    name,
                    role,
                    img,
                    game_id,
                },
            });
        });
    }
}
exports.default = PlayerService;
