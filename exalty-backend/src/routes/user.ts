import { PrismaClient } from "@prisma/client";
import express from "express";
import { prismaErrorHandler } from "../errors/prisma";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany().catch((e: { message: any }) => {
    prismaErrorHandler().errorHandler(e, req, res, (e) => {
      console.log(e);
    });
  });
  res.json(users);
});

router.get("/type", async (req, res) => {
  const type = await prisma.type.findMany().catch((e: { message: any }) => {
    prismaErrorHandler().errorHandler(e, req, res, (e) => {
      console.log(e);
    });
  });
  res.json(type);
});

router.post("/type", async (req, res) => {
  const type_name = req.body.type;
  const type = await prisma.type
    .create({
      data: {
        type_name: type_name,
      },
    })
    .catch((e: { message: any }) => {
      prismaErrorHandler().errorHandler(e, req, res, (e) => {
        console.log(e);
      });
    });
  res.json(type);
});

export default router;
