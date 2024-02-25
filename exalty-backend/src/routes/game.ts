import { game } from "@prisma/client";
import express from "express";
import GameService from "../services/game";
const router = express.Router();

router.get("/", async (req, res) => {
  const games = await GameService.getInstance().getAll();
  res.json(games);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const game = (await GameService.getInstance().getById(id)) as game | null;
  res.json(game);
});

router.post("/", async (req, res) => {
  const { name, title, desc, img } = req.body;
  const game = await GameService.getInstance().create(title, name, desc, img);
  res.json(game);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, title, desc, img } = req.body;
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  if (!name || !title || !desc || !img) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const game = await GameService.getInstance().update(
    id,
    title,
    name,
    desc,
    img
  );
  res.json(game);
});

export default router;
