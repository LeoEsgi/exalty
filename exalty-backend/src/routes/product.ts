import express from "express";
import ProductService from "../services/product";
const router = express.Router();

router.get("/", async (req, res) => {
  const games = await ProductService.getInstance().getAll();
  res.json(games);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name,
    flockingable,
    sizable,
    img,
    description,
    basePrice,
    img2,
    deleted,
  } = req.body;
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  if (
    !name ||
    flockingable == null ||
    sizable == null ||
    !img ||
    !description ||
    basePrice == null
  ) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const updatedProduct = await ProductService.getInstance().update(
    id,
    name,
    flockingable,
    sizable,
    img,
    description,
    basePrice,
    img2,
    deleted
  );
  res.json(updatedProduct);
});

export default router;
