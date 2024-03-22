"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("./multerConfig");
const router = express_1.default.Router();
router.post("/player", multerConfig_1.upload_player.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
router.post("/game", multerConfig_1.upload_game.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
router.post("/sponsor", multerConfig_1.upload_sponsor.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
router.post("/product", multerConfig_1.upload_product.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
router.post("/match", multerConfig_1.upload_match.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
router.post("/event", multerConfig_1.upload_event.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
router.post("/membership", multerConfig_1.upload_membership.single("image"), (req, res) => {
    if (req.file) {
        res.json({
            message: "Image uploaded successfully",
            fileName: req.file.filename,
        });
    }
    else {
        res.status(400).send("No image uploaded");
    }
});
exports.default = router;
