import { membership } from "@prisma/client";
import express from "express";
import MemberShip from "../services/membership";
const router = express.Router();

router.get("/", async (req, res) => {
  const memberships = await MemberShip.getInstance().getAll();
  res.json(memberships);
});

router.post("/", async (req, res) => {
  const membership = await MemberShip.getInstance().create(
    req.body as membership
  );
  res.json(membership);
});

export default router;
