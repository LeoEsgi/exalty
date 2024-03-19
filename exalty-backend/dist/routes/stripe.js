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
const router = express_1.default.Router();
const stripe = require("stripe")("sk_test_51OUHmoF7Ds1MzVzSmVLYqo5RgzLQ1JO2htcF28z7VtIWR85lBwScHW1TVqbRxCmnG5scGXM9owUEamxUiYxjA4ym000mGYqDmM");
router.post("/create-payment-intent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount,
            currency: currency, // Exemple: 'usd'
            // Vous pouvez ajouter d'autres options de paiement ici comme `receipt_email`, etc.
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        console.error("Erreur lors de la création du PaymentIntent:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la création du PaymentIntent" });
    }
}));
exports.default = router;
