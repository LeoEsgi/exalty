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

export default router;
