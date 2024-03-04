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
class ProductService {
    constructor() { }
    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.product.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.product.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    update(id, name, flockingable, sizable, img, description, basePrice, img2, deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            if (deleted) {
                return yield prisma.product.delete({
                    where: {
                        id,
                    },
                });
            }
            return yield prisma.product.upsert({
                where: {
                    id,
                },
                update: {
                    name,
                    flockingable,
                    sizable,
                    img,
                    description,
                    basePrice,
                    img2,
                },
                create: {
                    name,
                    flockingable,
                    sizable,
                    img,
                    description,
                    basePrice,
                    img2,
                },
            });
        });
    }
}
exports.default = ProductService;
