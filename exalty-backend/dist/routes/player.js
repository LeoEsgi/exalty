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
const player_1 = __importDefault(require("../services/player"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield player_1.default.getInstance().getAll();
    res.json(games);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const player = yield player_1.default.getInstance().getById(id);
    res.json(player);
}));
router.get("/:id/players", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const players = yield player_1.default.getInstance().getByGameId(id);
    res.json(players);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, img, game_id } = req.body;
    const player = yield player_1.default.getInstance().addPlayer(name, role, img, game_id);
    res.json(player);
}));
router.post("/:id/players", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, img } = req.body;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid id" });
        return;
    }
    if (!name || !role || !img) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    else {
        const player = yield player_1.default.getInstance().addPlayer(name, role, img, id);
        res.json(player);
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { game_id, name, role, img, id, deleted } = req.body;
    if (isNaN(id) || isNaN(id)) {
        res.status(400).json({ message: "Invalid id" });
        return;
    }
    if (!name || !role || !img) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    const player = yield player_1.default.getInstance().updatePlayer(id, name, role, img, game_id, deleted);
    res.json(player);
}));
exports.default = router;
