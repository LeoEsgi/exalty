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
const sponsor_1 = __importDefault(require("../services/sponsor"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield sponsor_1.default.getInstance().getAll();
    res.json(games);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, description, img, link, deleted } = req.body;
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid id" });
        return;
    }
    if (!name || !description || !img || !link) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    const updatedSponsor = yield sponsor_1.default.getInstance().update(id, name, img, description, link, deleted);
    res.json(updatedSponsor);
}));
exports.default = router;
