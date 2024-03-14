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
const shop_1 = __importDefault(require("../services/shop"));
const router = express_1.default.Router();
router.post("/address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield shop_1.default.getInstance().createAddress(req.body);
    res.json(address);
}));
router.get("/address/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const address = yield shop_1.default.getInstance().getAddressById(id);
    res.json(address);
}));
router.get("/address/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const address = yield shop_1.default.getInstance().getAddressByUserId(userId);
    res.json(address);
}));
router.post("/cart/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const content = req.body.content;
    const product = content.product;
    const quantity = content.quantity;
    const size = content.size;
    const flocking = content.flocking;
    const cart = yield shop_1.default.getInstance().createCart(userId, product, quantity, size, flocking);
    res.json(cart);
}));
router.delete("/cart/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const cart = yield shop_1.default.getInstance().delete_cart_content(id);
    res.json(cart);
}));
router.get("/cart/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const cart = yield shop_1.default.getInstance().getCartById(id);
    res.json(cart);
}));
router.get("/cart/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const cart = yield shop_1.default.getInstance().getCartByUserId(userId);
    res.json(cart);
}));
router.post("/order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield shop_1.default.getInstance().createOrder(req.body);
    res.json(order);
}));
router.get("/order/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const order = yield shop_1.default.getInstance().getOrderById(id);
    res.json(order);
}));
router.get("/order/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const order = yield shop_1.default.getInstance().getOrderByUserId(userId);
    res.json(order);
}));
router.get("/credit/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const credit = yield shop_1.default.getInstance().getCreditCardByUserId(userId);
    res.json(credit);
}));
router.post("/credit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credit = yield shop_1.default.getInstance().createCreditCard(req.body);
    res.json(credit);
}));
exports.default = router;
