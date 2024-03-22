"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePlugin = exports.buildRoutes = void 0;
const user_1 = __importDefault(require("./user"));
const authentication_1 = __importDefault(require("./authentication"));
const matches_1 = __importDefault(require("./matches"));
const game_1 = __importDefault(require("./game"));
const player_1 = __importDefault(require("./player"));
const membership_1 = __importDefault(require("./membership"));
const recruitment_1 = __importDefault(require("./recruitment"));
const sponsor_1 = __importDefault(require("./sponsor"));
const product_1 = __importDefault(require("./product"));
const mail_1 = __importDefault(require("./mail"));
const shop_1 = __importDefault(require("./shop"));
const event_1 = __importDefault(require("./event"));
const stripe_1 = __importDefault(require("./stripe"));
const upload_image_1 = __importDefault(require("./upload-image"));
const prisma_1 = require("../errors/prisma");
function buildRoutes(app) {
    app.use("/user", user_1.default);
    app.use("/auth", authentication_1.default);
    app.use("/match", matches_1.default);
    app.use("/game", game_1.default);
    app.use("/player", player_1.default);
    app.use("/membership", membership_1.default);
    app.use("/recruitment", recruitment_1.default);
    app.use("/sponsor", sponsor_1.default);
    app.use("/product", product_1.default);
    app.use("/mail", mail_1.default);
    app.use("/shop", shop_1.default);
    app.use("/event", event_1.default);
    app.use("/stripe", stripe_1.default);
    app.use("/upload-image", upload_image_1.default);
    app.use((0, prisma_1.prismaErrorHandler)().errorHandler);
}
exports.buildRoutes = buildRoutes;
function routePlugin() {
    return {
        name: "route-plugin",
        configureRoute(app) {
            const route = buildRoutes(app);
        },
    };
}
exports.routePlugin = routePlugin;
