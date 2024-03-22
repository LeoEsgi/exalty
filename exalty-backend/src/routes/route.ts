import express from "express";
import userRouter from "./user";
import authRouter from "./authentication";
import matchesRouter from "./matches";
import gameRouter from "./game";
import playerRouter from "./player";
import memberShipRouter from "./membership";
import recruitmentRouter from "./recruitment";
import sponsorRouter from "./sponsor";
import productRouter from "./product";
import mailRouter from "./mail";
import shopRouter from "./shop";
import eventRouter from "./event";
import stripeRouter from "./stripe";
import uploadImageRouter from "./upload-image";
import { prismaErrorHandler } from "../errors/prisma";

export function buildRoutes(app: express.Express) {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/match", matchesRouter);
  app.use("/game", gameRouter);
  app.use("/player", playerRouter);
  app.use("/membership", memberShipRouter);
  app.use("/recruitment", recruitmentRouter);
  app.use("/sponsor", sponsorRouter);
  app.use("/product", productRouter);
  app.use("/mail", mailRouter);
  app.use("/shop", shopRouter);
  app.use("/event", eventRouter);
  app.use("/stripe", stripeRouter);
  app.use("/upload-image", uploadImageRouter);
  app.use(prismaErrorHandler().errorHandler);
}

export function routePlugin() {
  return {
    name: "route-plugin",
    configureRoute(app: express.Express) {
      const route = buildRoutes(app);
    },
  };
}
