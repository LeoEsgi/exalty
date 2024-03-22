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
class EventService {
    constructor() { }
    static getInstance() {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }
        return EventService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.event.findMany();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.event.upsert({
                where: {
                    id: data.id,
                },
                update: {
                    title: data.title,
                    description: data.description,
                    img: data.img,
                    link: data.link,
                    start_date: data.start_date,
                    end_date: data.end_date,
                },
                create: {
                    title: data.title,
                    description: data.description,
                    img: data.img,
                    link: data.link,
                    start_date: data.start_date,
                    end_date: data.end_date,
                },
            });
        });
    }
}
exports.default = EventService;
