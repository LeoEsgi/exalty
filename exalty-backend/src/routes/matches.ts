import { PrismaClient, matches, match_status } from "@prisma/client";
import express from "express";
import { prismaErrorHandler } from "../errors/prisma";
import MatchesService from "../services/matches";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const matches = await MatchesService.getInstance().getAll();
  res.json(matches);
});

router.get("/status/:status", async (req, res) => {
  const status = req.params.status as match_status;
  const matches = (await MatchesService.getInstance().getByStatus(status)) as
    | matches[]
    | null;
  res.json(matches);
});

router.put("/", async (req, res) => {
  const {
    title,
    instance,
    opponent,
    opponent_logo,
    score_exa,
    score_opponent,
    format,
    date,
    timezone,
    link,
    status,
    id,
    deleted,
  } = req.body;

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  if (
    !title ||
    !instance ||
    !opponent ||
    !opponent_logo ||
    score_exa == null ||
    score_opponent == null ||
    !format ||
    !date ||
    !timezone ||
    !link ||
    !status
  ) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const updatedMatch = await MatchesService.getInstance().update(
    id,
    title,
    instance,
    opponent,
    opponent_logo,
    score_exa,
    score_opponent,
    format,
    date,
    timezone,
    link,
    status,
    deleted
  );
  res.json(updatedMatch);
});

export default router;
