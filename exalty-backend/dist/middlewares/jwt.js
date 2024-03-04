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
exports.checkRole = exports.verifyJwt = void 0;
const jwt_1 = __importDefault(require("../services/jwt"));
const user_1 = __importDefault(require("../services/user"));
function verifyJwt(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Missing JWT Token" });
            return;
        }
        try {
            const userInToken = jwt_1.default.getInstance().verifyToken(token);
            const user = yield user_1.default.getInstance().getByEmail(userInToken.email);
            req.user = user;
            next();
        }
        catch (e) {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}
exports.verifyJwt = verifyJwt;
const checkRole = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Missing JWT Token" });
            return;
        }
        try {
            const userInToken = jwt_1.default.getInstance().verifyToken(token);
            const user = yield user_1.default.getInstance().getByEmail(userInToken.email);
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            // Récupère les rôles de l'utilisateur
            const userRoles = yield user_1.default.getInstance().getById(user.id);
            if (!userRoles) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            // Vérifie si l'utilisateur a un rôle autorisé
            const hasAllowedRole = allowedRoles.some((role) => {
                return userRoles.role_id === role;
            });
            if (hasAllowedRole) {
                next();
                return;
            }
            throw new Error("Wrong role");
        }
        catch (e) {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
};
exports.checkRole = checkRole;
