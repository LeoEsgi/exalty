import { PrismaClient, user } from "@prisma/client";
import express from "express";
import UserService from "../services/user";
import { checkRole } from "../middlewares";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", checkRole([2] as user["role_id"][]), async (req, res) => {
  const users = await UserService.getInstance().getAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await UserService.getInstance().getById(id);
  res.json(user);
});

router.get("/role/:role_id", async (req, res) => {
  const role_id = parseInt(req.params.role_id);
  const user = await UserService.getInstance().getByRoleId(role_id);
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = req.body.deleted;
  console.log(req.body);
  const user = await UserService.getInstance().update(id, req.body, deleted);
  res.json(user);
});
router.put("/update_point/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { fidelity_points } = req.body;

  const user = await UserService.getInstance().updatePoints(
    id,
    fidelity_points
  );
  res.json(user);
});

router.post("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await UserService.getInstance().updatePassword(id, req.body);
  res.json(user);
});

export default router;
