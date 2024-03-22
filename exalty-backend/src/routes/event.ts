import { event } from "@prisma/client";
import express from "express";
import EventService from "../services/event";
const router = express.Router();

router.get("/", async (req, res) => {
  const events = await EventService.getInstance().getAll();
  res.json(events);
});

router.put("/", async (req, res) => {
  const event = req.body as event;
  const NewEvent = await EventService.getInstance().create(event);
  res.json(NewEvent);
});

export default router;
