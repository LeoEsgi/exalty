"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_match = exports.upload_product = exports.upload_sponsor = exports.upload_game = exports.upload_player = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage_player = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../public/uploads/player"));
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
const storage_game = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../public/uploads/game"));
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
const storage_sponsor = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../public/uploads/sponsor"));
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
const storage_product = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../public/uploads/product"));
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
const storage_match = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../public/uploads/match"));
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
exports.upload_player = (0, multer_1.default)({ storage: storage_player });
exports.upload_game = (0, multer_1.default)({ storage: storage_game });
exports.upload_sponsor = (0, multer_1.default)({ storage: storage_sponsor });
exports.upload_product = (0, multer_1.default)({ storage: storage_product });
exports.upload_match = (0, multer_1.default)({ storage: storage_match });
