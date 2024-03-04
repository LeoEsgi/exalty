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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../errors/prisma");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield prisma.collection.findMany().catch((e) => {
        (0, prisma_1.prismaErrorHandler)().errorHandler(e, req, res, (e) => {
            console.log(e);
        });
    });
    res.json(collection);
}));
router.get("/:collectionId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionId } = req.params;
    const collection = yield prisma.collection
        .findUnique({
        where: {
            collection_id: parseInt(collectionId),
        },
    })
        .catch((e) => {
        (0, prisma_1.prismaErrorHandler)().errorHandler(e, req, res, (e) => {
            console.log(e);
        });
    });
    res.json(collection);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, name } = req.body;
    const collection = yield prisma.collection
        .create({
        data: {
            description: description,
            name: name,
        },
    })
        .catch((e) => {
        (0, prisma_1.prismaErrorHandler)().errorHandler(e, req, res, (e) => {
            console.log(e);
        });
    });
    res.json(collection);
}));
exports.default = router;
