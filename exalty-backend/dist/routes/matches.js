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
const matches_1 = __importDefault(require("../services/matches"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield matches_1.default.getInstance().getAll();
    res.json(matches);
}));
router.get("/status/:status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const matches = (yield matches_1.default.getInstance().getByStatus(status));
    res.json(matches);
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, instance, opponent, opponent_logo, score_exa, score_opponent, format, date, timezone, link, status, id, deleted, } = req.body;
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid id" });
        return;
    }
    if (!title ||
        !instance ||
        !opponent ||
        !opponent_logo ||
        score_exa == null ||
        score_opponent == null ||
        !format ||
        !date ||
        !timezone ||
        !link ||
        !status) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    const updatedMatch = yield matches_1.default.getInstance().update(id, title, instance, opponent, opponent_logo, score_exa, score_opponent, format, date, timezone, link, status, deleted);
    res.json(updatedMatch);
}));
exports.default = router;
