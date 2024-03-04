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
const recruitment_1 = __importDefault(require("../services/recruitment"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield recruitment_1.default.getInstance().getAll();
    res.json(games);
}));
router.get("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield recruitment_1.default.getInstance().getCategories();
    res.json(category);
}));
router.get("/category/:id/sub-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const subCategory = yield recruitment_1.default.getInstance().getSubCategoriesByCategoryId(id);
    res.json(subCategory);
}));
router.get("/sub-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = yield recruitment_1.default.getInstance().getSubCategories();
    res.json(subCategory);
}));
exports.default = router;
