"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const body_parser_1 = require("body-parser");
const route_1 = require("./routes/route");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Express configuration for parsing JSON and urlencoded data
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/uploads/game", express_1.default.static(path_1.default.join(__dirname, "public/uploads/game")));
app.use("/uploads/player", express_1.default.static(path_1.default.join(__dirname, "public/uploads/player")));
app.use("/uploads/sponsor", express_1.default.static(path_1.default.join(__dirname, "public/uploads/sponsor")));
app.use("/uploads/product", express_1.default.static(path_1.default.join(__dirname, "public/uploads/product")));
app.use("/uploads/match", express_1.default.static(path_1.default.join(__dirname, "public/uploads/match")));
app.use("/uploads/event", express_1.default.static(path_1.default.join(__dirname, "public/uploads/event")));
app.use("/uploads/membership", express_1.default.static(path_1.default.join(__dirname, "public/uploads/membership")));
const port = process.env.API_PORT;
const server = http.createServer(app);
(0, route_1.routePlugin)().configureRoute(app);
server.listen(port, () => {
    console.log("Server is running on port " + port);
});
