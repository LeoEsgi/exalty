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
class UserService {
    constructor() { }
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: {
                    email,
                },
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getByRoleId(role_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany({
                where: {
                    role_id,
                },
            });
        });
    }
    update(id, data, deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            if (deleted) {
                return yield prisma.user.delete({
                    where: {
                        id,
                    },
                });
            }
            return yield prisma.user.upsert({
                where: {
                    id,
                },
                update: data,
                create: data,
            });
        });
    }
}
exports.default = UserService;