import express from "express";
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51OUHmoF7Ds1MzVzSmVLYqo5RgzLQ1JO2htcF28z7VtIWR85lBwScHW1TVqbRxCmnG5scGXM9owUEamxUiYxjA4ym000mGYqDmM"
);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Exemple: 2000 pour $20.00
      currency: currency, // Exemple: 'usd'
      // Vous pouvez ajouter d'autres options de paiement ici comme `receipt_email`, etc.
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création du PaymentIntent" });
  }
});
export default router;
