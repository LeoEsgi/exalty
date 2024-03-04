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
const express_1 = __importDefault(require("express"));
const game_1 = __importDefault(require("../services/game"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield game_1.default.getInstance().getAll();
    res.json(games);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const game = (yield game_1.default.getInstance().getById(id));
    res.json(game);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, title, desc, img } = req.body;
    const game = yield game_1.default.getInstance().create(title, name, desc, img);
    res.json(game);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, title, desc, img } = req.body;
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid id" });
        return;
    }
    if (!name || !title || !desc || !img) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    const game = yield game_1.default.getInstance().update(id, title, name, desc, img);
    res.json(game);
}));
exports.default = router;