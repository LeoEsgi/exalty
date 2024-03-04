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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../errors/prisma");
const middlewares_1 = require("../middlewares");
const jwt_1 = __importDefault(require("../services/jwt"));
const user_1 = __importDefault(require("../services/user"));
const mail_1 = __importDefault(require("../services/mail"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.getInstance().getByEmail(email);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const samePassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!samePassword) {
        res.status(401).json({ message: "Wrong password" });
    }
    else {
        const token = yield jwt_1.default.getInstance().createToken(user);
        res.cookie("token", token, { httpOnly: true }).json({ token });
    }
}));
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pseudo, password, email, first_name, last_name, tag, type_id } = req.body;
    const type_id_to_use = type_id !== null && type_id !== void 0 ? type_id : 1;
    const user = yield user_1.default.getInstance().getByEmail(email);
    if (user) {
        res.status(409).json({ message: "User already exists" });
        return;
    }
    try {
        const userCreated = yield prisma.user
            .create({
            data: {
                pseudo: pseudo,
                password: yield bcryptjs_1.default.hash(password, 10),
                email: email,
                first_name: first_name,
                last_name: last_name,
                discord_tag: tag,
                role_id: type_id_to_use,
            },
        })
            .catch((e) => {
            (0, prisma_1.prismaErrorHandler)().errorHandler(e, req, res, (e) => {
                console.log(e);
            });
        });
        if (!userCreated)
            throw new Error("Error while creating the user");
        const verificationToken = yield bcryptjs_1.default.hash(userCreated.id.toString(), 8);
        const verificationUpdated = yield prisma.user
            .update({
            where: {
                id: userCreated.id,
            },
            data: {
                token_verification: verificationToken,
            },
        })
            .catch((e) => {
            (0, prisma_1.prismaErrorHandler)().errorHandler(e, req, res, (e) => {
                console.log(e);
            });
        });
        if (!verificationUpdated)
            throw new Error("Error while updating the user token verification");
        mail_1.default.getInstance()
            .sendMail(email, "Bienvenue sur Exalty", "Bienvenue sur Exalty", "<h1>Bienvenue sur Exalty</h1> <p>Vous venez de vous inscrire sur Exalty, nous vous souhaitons la bienvenue !</p>" +
            "<p>Veuillez valider votre adresse mail en cliquant sur le lien suivant : <a href='http://localhost:3000/validate-email?token=" +
            verificationToken +
            "'>Valider mon adresse mail</a></p>" +
            "<p>À bientôt sur Exalty !</p> <p>L'équipe Exalty</p>")
            .then(() => {
            return res.json({ message: "User created" });
        });
    }
    catch (e) {
        next(e);
    }
}));
router.post("/validate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = yield prisma.user.update({
            where: {
                token_verification: token,
            },
            data: {
                active: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({ message: "User validated" });
    }
    catch (e) {
        (0, prisma_1.prismaErrorHandler)().errorHandler(e, req, res, (e) => {
            console.log(e);
        });
    }
}));
router.get("/me", middlewares_1.verifyJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.json(userWithoutPassword);
}));
router.get("/admin", (0, middlewares_1.checkRole)([2]), (req, res) => {
    res.json({ message: "Authorized" });
});
router.get("/verify", middlewares_1.verifyJwt, (req, res) => {
    res.json({ isAuthenticated: true });
});
exports.default = router;
