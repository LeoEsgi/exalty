import { game } from "@prisma/client";
import express from "express";
import PlayerService from "../services/player";
const router = express.Router();

router.get("/", async (req, res) => {
  const games = await PlayerService.getInstance().getAll();
  res.json(games);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const player = await PlayerService.getInstance().getById(id);
  res.json(player);
});

router.get("/:id/players", async (req, res) => {
  const id = parseInt(req.params.id);
  const players = await PlayerService.getInstance().getByGameId(id);
  res.json(players);
});

router.post("/", async (req, res) => {
  const { name, role, img, game_id } = req.body;
  const player = await PlayerService.getInstance().addPlayer(
    name,
    role,
    img,
    game_id
  );
  res.json(player);
});

router.post("/:id/players", async (req, res) => {
  const { name, role, img } = req.body;
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  if (!name || !role || !img) {
    res.status(400).json({ message: "Missing fields" });
    return;
  } else {
    const player = await PlayerService.getInstance().addPlayer(
      name,
      role,
      img,
      id
    );
    res.json(player);
  }
});

router.put("/", async (req, res) => {
  const { game_id, name, role, img, id, deleted } = req.body;
  if (isNaN(id) || isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  if (!name || !role || !img) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const player = await PlayerService.getInstance().updatePlayer(
    id,
    name,
    role,
    img,
    game_id,
    deleted
  );
  res.json(player);
});

export default router;
