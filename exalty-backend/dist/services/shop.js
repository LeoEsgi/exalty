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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ShopService {
    constructor() { }
    static getInstance() {
        if (!ShopService.instance) {
            ShopService.instance = new ShopService();
        }
        return ShopService.instance;
    }
    createAddress(addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.address.create({
                data: addressData,
            });
        });
    }
    getAddressById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.address.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getAddressByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.address.findMany({
                where: {
                    user_id,
                },
            });
        });
    }
    createCart(user_id, product, quantity, size, flocking) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield prisma.cart.findFirst({
                where: {
                    user_id,
                },
            });
            if (!cart) {
                cart = yield prisma.cart.create({
                    data: {
                        user_id,
                    },
                });
                return yield prisma.cart_content.create({
                    data: {
                        card_id: cart.id,
                        product_id: product.id,
                        quantity: quantity,
                        size: size,
                        flocking: flocking,
                    },
                });
            }
            const cartContent = yield prisma.cart_content.findFirst({
                where: {
                    card_id: cart.id,
                    product_id: product.id,
                },
            });
            if (cartContent) {
                return yield prisma.cart_content.update({
                    where: {
                        id: cartContent.id,
                    },
                    data: {
                        quantity: cartContent.quantity + quantity,
                    },
                });
            }
            return yield prisma.cart_content.create({
                data: {
                    card_id: cart.id,
                    product_id: product.id,
                    quantity: quantity,
                    size: size,
                    flocking: flocking,
                },
            });
        });
    }
    delete_cart_content(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield prisma.cart_content.delete({
                where: {
                    id,
                },
            });
            console.log(c);
            return yield prisma.cart.findFirst({
                where: {
                    user_id: c.card_id,
                },
                include: {
                    cart_content: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        });
    }
    getCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.cart.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getCartByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.cart.findFirst({
                where: {
                    user_id,
                },
                include: {
                    cart_content: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        });
    }
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.order.create({
                data: orderData,
            });
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.order.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getOrderByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.order.findMany({
                where: {
                    user_id,
                },
                include: {
                    order_content: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        });
    }
    createCreditCard(creditCardData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.credit_card.create({
                data: creditCardData,
            });
        });
    }
    getCreditCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.credit_card.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getCreditCardByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.credit_card.findMany({
                where: {
                    user_id,
                },
            });
        });
    }
}
exports.default = ShopService;
