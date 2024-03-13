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
const user_1 = __importDefault(require("../services/user"));
const middlewares_1 = require("../middlewares");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (0, middlewares_1.checkRole)([2]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.getInstance().getAll();
    res.json(users);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield user_1.default.getInstance().getById(id);
    res.json(user);
}));
router.get("/role/:role_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role_id = parseInt(req.params.role_id);
    const user = yield user_1.default.getInstance().getByRoleId(role_id);
    res.json(user);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const deleted = req.body.deleted;
    const user = yield user_1.default.getInstance().update(id, req.body, deleted);
    res.json(user);
}));
router.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield user_1.default.getInstance().updatePassword(id, req.body);
    res.json(user);
}));
exports.default = router;
