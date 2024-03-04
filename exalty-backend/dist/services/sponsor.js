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
class SponsorService {
    constructor() { }
    static getInstance() {
        if (!SponsorService.instance) {
            SponsorService.instance = new SponsorService();
        }
        return SponsorService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.sponsor.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.sponsor.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    create(name, img, description, link) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.sponsor.create({
                data: {
                    name,
                    img,
                    description,
                    link,
                },
            });
        });
    }
    update(id, name, img, description, link, deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            if (deleted) {
                return yield prisma.sponsor.delete({
                    where: {
                        id,
                    },
                });
            }
            return yield prisma.sponsor.upsert({
                where: {
                    id,
                },
                update: {
                    name,
                    img,
                    description,
                    link,
                },
                create: {
                    name,
                    img,
                    description,
                    link,
                },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.sponsor.delete({
                where: {
                    id,
                },
            });
        });
    }
}
exports.default = SponsorService;
