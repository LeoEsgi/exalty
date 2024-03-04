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
const mail_1 = __importDefault(require("../services/mail"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, message, html } = req.body;
    if (!email || !message) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    const mail = yield mail_1.default.getInstance().sendMail(email, subject, message, html);
    res.json(mail);
}));
router.post("/cron", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, message, html, cronTime } = req.body;
    if (!email || !message || !cronTime) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    const mail = yield mail_1.default.getInstance().sendMailWithCron(email, subject, message, html, cronTime);
    res.json(mail);
}));
exports.default = router;
