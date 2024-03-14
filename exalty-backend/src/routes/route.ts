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
import uploadImageRouter from "./upload-image";

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
  app.use("/upload-image", uploadImageRouter);
}

export function routePlugin() {
  return {
    name: "route-plugin",
    configureRoute(app: express.Express) {
      const route = buildRoutes(app);
    },
  };
}
