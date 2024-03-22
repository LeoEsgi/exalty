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
            }
            yield this.create_cart_content(cart.id, product.id, quantity, size, flocking);
            return yield prisma.cart.findFirst({
                where: {
                    user_id,
                },
                include: {
                    cart_content: {
                        include: {
                            product: true,
                            size: true,
                            flocking: true,
                        },
                    },
                },
            });
        });
    }
    create_cart_content(card_id, product_id, quantity, size, flocking) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield prisma.cart_content.upsert({
                where: {
                    card_id_product_id: {
                        card_id,
                        product_id,
                    },
                },
                create: {
                    card_id,
                    product_id,
                    quantity,
                },
                update: {
                    quantity: {
                        increment: quantity,
                    },
                },
            });
            if (c) {
                if (size && size.length > 0) {
                    yield Promise.all(size.map((s) => prisma.cart_content_size.create({
                        data: {
                            cart_content_id: c.id,
                            size: s,
                        },
                    })));
                }
                if (flocking && flocking.length > 0) {
                    yield Promise.all(flocking.map((f) => prisma.cart_content_flocking.create({
                        data: {
                            cart_content_id: c.id,
                            value: f,
                        },
                    })));
                }
            }
            return c;
        });
    }
    delete_cart_content(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.cart_content_size.deleteMany({
                where: {
                    cart_content_id: id,
                },
            });
            yield prisma.cart_content_flocking.deleteMany({
                where: {
                    cart_content_id: id,
                },
            });
            const c = yield prisma.cart_content.delete({
                where: {
                    id,
                },
            });
            return yield prisma.cart.findFirst({
                where: {
                    id: c.card_id,
                },
                include: {
                    cart_content: {
                        include: {
                            product: true,
                            size: true,
                            flocking: true,
                        },
                    },
                },
            });
        });
    }
    update_cart_content(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartContent = yield prisma.cart_content.findFirst({
                where: {
                    id,
                },
            });
            if (!cartContent) {
                return null;
            }
            const c = yield prisma.cart_content.update({
                where: {
                    id,
                },
                data: {
                    quantity,
                },
            });
            const diff = quantity - cartContent.quantity;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    yield prisma.cart_content_size.create({
                        data: {
                            cart_content_id: c.id,
                            size: "M",
                        },
                    });
                    yield prisma.cart_content_flocking.create({
                        data: {
                            cart_content_id: c.id,
                            value: "",
                        },
                    });
                }
            }
            return yield prisma.cart.findFirst({
                where: {
                    id: c.card_id,
                },
                include: {
                    cart_content: {
                        include: {
                            product: true,
                            size: true,
                            flocking: true,
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
                            size: true,
                            flocking: true,
                        },
                    },
                },
            });
        });
    }
    createOrder(price_ht, price_ttc, paid_price_ht, paid_price_ttc, user_id, billing_address_id, shipping_address_id, discount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.order.create({
                data: {
                    price_ht,
                    price_ttc,
                    paid_price_ht,
                    paid_price_ttc,
                    user_id,
                    billing_address_id,
                    shipping_address_id,
                    discount,
                    payment_status: "PAID",
                    status: "VALIDATED",
                },
            });
        });
    }
    updateOrder(id, status, payment_status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.order.update({
                where: {
                    id,
                },
                data: {
                    status,
                    payment_status,
                },
            });
        });
    }
    createOrderContent(quantity, product_id, order_id, size, flocking) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield prisma.order_content.create({
                data: {
                    quantity,
                    product_id,
                    order_id,
                },
            });
            if (c) {
                if (size && size.length > 0) {
                    yield Promise.all(size.map((s) => prisma.order_content_size.create({
                        data: {
                            order_content_id: c.id,
                            size: s,
                        },
                    })));
                }
                if (flocking && flocking.length > 0) {
                    yield Promise.all(flocking.map((f) => prisma.order_content_flocking.create({
                        data: {
                            order_content_id: c.id,
                            value: f,
                        },
                    })));
                }
            }
            return c;
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.order.findMany({
                include: {
                    order_content: {
                        include: {
                            product: true,
                            size: true,
                            flocking: true,
                        },
                    },
                    billing_address: true,
                    shipping_address: true,
                },
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
                    billing_address: true,
                    shipping_address: true,
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
