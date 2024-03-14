import express from "express";
import ShopService from "../services/shop";
const router = express.Router();

router.post("/address", async (req, res) => {
  const address = await ShopService.getInstance().createAddress(req.body);
  res.json(address);
});

router.get("/address/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const address = await ShopService.getInstance().getAddressById(id);
  res.json(address);
});

router.get("/address/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const address = await ShopService.getInstance().getAddressByUserId(userId);
  res.json(address);
});

router.post("/cart/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const content = req.body.content;
  const product = content.product;
  const quantity = content.quantity;
  const size = content.size;
  const flocking = content.flocking;
  const cart = await ShopService.getInstance().createCart(
    userId,
    product,
    quantity,
    size,
    flocking
  );
  res.json(cart);
});

router.delete("/cart/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await ShopService.getInstance().delete_cart_content(id);
  res.json(cart);
});

router.get("/cart/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await ShopService.getInstance().getCartById(id);
  res.json(cart);
});

router.get("/cart/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const cart = await ShopService.getInstance().getCartByUserId(userId);
  res.json(cart);
});

router.post("/order", async (req, res) => {
  const order = await ShopService.getInstance().createOrder(req.body);
  res.json(order);
});

router.get("/order/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const order = await ShopService.getInstance().getOrderById(id);
  res.json(order);
});

router.get("/order/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const order = await ShopService.getInstance().getOrderByUserId(userId);
  res.json(order);
});

router.get("/credit/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const credit = await ShopService.getInstance().getCreditCardByUserId(userId);
  res.json(credit);
});

router.post("/credit", async (req, res) => {
  const credit = await ShopService.getInstance().createCreditCard(req.body);
  res.json(credit);
});

export default router;
