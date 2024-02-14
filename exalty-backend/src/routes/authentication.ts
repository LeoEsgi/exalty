import { PrismaClient, user } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
import { prismaErrorHandler } from "../errors/prisma";
import { checkRole, verifyJwt } from "../middlewares";
import JwtService from "../services/jwt";
import UserService from "../services/user";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/sign-in", async (req, res) => {
  const { address, password } = req.body;
  const user = await UserService.getInstance().getByAddress(address);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const samePassword = await bcrypt.compare(password, user.password_hash);

  if (!samePassword) {
    res.status(401).json({ message: "Wrong password" });
  } else {
    const token = await JwtService.getInstance().createToken(user);
    res.cookie("token", token, { httpOnly: true }).json({ token });
  }
});

router.post("/register", async (req, res, next) => {
  const { pseudo, password, email, type_id } = req.body;
  const type_id_to_use = type_id ?? 1;
  const user = await UserService.getInstance().getByEmail(email);
  if (user) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  try {
    const userCreated = await prisma.user
      .create({
        data: {
          pseudo: pseudo,
          password_hash: await bcrypt.hash(password, 10),
          email: email,
          type_id: type_id_to_use,
        },
      })
      .catch((e) => {
        prismaErrorHandler().errorHandler(e, req, res, (e) => {
          console.log(e);
        });
      });

    if (!userCreated) throw new Error("Error while creating the user");
    const token = await JwtService.getInstance().createToken(userCreated);
    res.cookie("token", token, { httpOnly: true }).json({ token });
  } catch (e) {
    next(e);
  }
});

router.get("/me", verifyJwt, async (req, res) => {
  const user: user = (req as any).user;
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.get(
  "/admin",
  checkRole(["ADMIN"] as user["user_role"][]),
  (req, res) => {
    res.json({ message: "Authorized" });
  }
);

export default router;
