"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    constructor() { }
    static getInstance() {
        if (!JwtService.instance) {
            JwtService.instance = new JwtService();
        }
        return JwtService.instance;
    }
    createToken(user) {
        if (!process.env.JWT_SECRET)
            throw new Error("JWT_SECRET is not defined");
        const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });
        return token;
    }
    verifyToken(token) {
        if (!process.env.JWT_SECRET)
            throw new Error("JWT_SECRET is not defined");
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return decoded.user;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
exports.default = JwtService;
